# Deploy script for production
#!/bin/bash

set -e

echo "🚀 Deploying EcoTracker..."

# Configuration
ENVIRONMENT=${1:-production}
NAMESPACE="ecotracker"

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is required but not installed. Please install kubectl first."
    exit 1
fi

# Check if we're connected to a cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Not connected to a Kubernetes cluster. Please configure kubectl first."
    exit 1
fi

echo "📦 Deploying to environment: $ENVIRONMENT"

# Create namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Deploy based on environment
case $ENVIRONMENT in
    "development" | "dev")
        echo "🔧 Deploying development environment..."
        docker-compose -f docker-compose.dev.yml up -d
        ;;
    "staging")
        echo "🧪 Deploying staging environment..."
        kubectl apply -f k8s/ -n $NAMESPACE
        # Apply staging-specific overrides here
        ;;
    "production" | "prod")
        echo "🏭 Deploying production environment..."
        
        # Verify secrets exist
        if ! kubectl get secret ecotracker-secrets -n $NAMESPACE &> /dev/null; then
            echo "❌ Required secrets not found. Please create secrets first:"
            echo "  kubectl create secret generic ecotracker-secrets \\"
            echo "    --from-literal=JWT_SECRET=your-jwt-secret \\"
            echo "    --from-literal=GEMINI_API_KEY=your-api-key \\"
            echo "    -n $NAMESPACE"
            exit 1
        fi
        
        # Deploy to Kubernetes
        kubectl apply -f k8s/ -n $NAMESPACE
        
        # Wait for deployment to be ready
        echo "⏳ Waiting for deployment to be ready..."
        kubectl rollout status deployment/ecotracker-app -n $NAMESPACE --timeout=300s
        kubectl rollout status deployment/nginx-frontend -n $NAMESPACE --timeout=300s
        ;;
    *)
        echo "❌ Unknown environment: $ENVIRONMENT"
        echo "Usage: $0 [development|staging|production]"
        exit 1
        ;;
esac

# Run health checks
echo "🔍 Running health checks..."
case $ENVIRONMENT in
    "development" | "dev")
        sleep 10
        if curl -f http://localhost:8080/health &> /dev/null; then
            echo "✅ Development deployment healthy!"
        else
            echo "❌ Health check failed!"
            exit 1
        fi
        ;;
    "staging" | "production" | "prod")
        # Wait for pods to be ready
        kubectl wait --for=condition=ready pod -l app=ecotracker -n $NAMESPACE --timeout=300s
        
        # Get service endpoints
        echo "📋 Service endpoints:"
        kubectl get ingress -n $NAMESPACE
        echo "✅ Deployment completed successfully!"
        ;;
esac

echo ""
echo "🎉 Deployment to $ENVIRONMENT completed successfully!"

# Show useful commands
echo ""
echo "Useful commands:"
case $ENVIRONMENT in
    "development" | "dev")
        echo "  View logs: docker-compose -f docker-compose.dev.yml logs -f"
        echo "  Stop: docker-compose -f docker-compose.dev.yml down"
        ;;
    *)
        echo "  View logs: kubectl logs -f deployment/ecotracker-app -n $NAMESPACE"
        echo "  Scale: kubectl scale deployment/ecotracker-app --replicas=5 -n $NAMESPACE"
        echo "  Status: kubectl get all -n $NAMESPACE"
        ;;
esac

# Makefile for EcoTracker

.PHONY: help build start stop clean logs test deploy

# Default target
help:
	@echo "EcoTracker Development Commands"
	@echo "==============================="
	@echo "build        - Build the application for production"
	@echo "start        - Start the application in development mode"
	@echo "start-prod   - Start the application in production mode"
	@echo "stop         - Stop the application"
	@echo "clean        - Clean up Docker containers and images"
	@echo "logs         - Show application logs"
	@echo "test         - Run tests"
	@echo "lint         - Run linting"
	@echo "deploy-dev   - Deploy to development environment"
	@echo "deploy-prod  - Deploy to production environment"
	@echo "k8s-deploy   - Deploy to Kubernetes"
	@echo "monitor      - Open monitoring dashboard"

# Build application
build:
	@echo "🏗️  Building EcoTracker..."
	@chmod +x build.sh
	@./build.sh

# Development
start:
	@echo "🚀 Starting development environment..."
	@docker-compose -f docker-compose.dev.yml up -d
	@echo "✅ Development environment started!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3001"
	@echo "Nginx: http://localhost:8080"

# Production
start-prod:
	@echo "🚀 Starting production environment..."
	@docker-compose up -d
	@echo "✅ Production environment started!"
	@echo "Application: http://localhost"
	@echo "Grafana: http://localhost:3000"
	@echo "Prometheus: http://localhost:9090"

# Stop services
stop:
	@echo "🛑 Stopping services..."
	@docker-compose down
	@docker-compose -f docker-compose.dev.yml down

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	@docker-compose down --rmi all --volumes --remove-orphans
	@docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
	@docker system prune -af

# Show logs
logs:
	@docker-compose logs -f

logs-dev:
	@docker-compose -f docker-compose.dev.yml logs -f

# Testing
test:
	@echo "🧪 Running tests..."
	@cd frontend && npm test
	@cd server && npm test

# Linting
lint:
	@echo "🔍 Running linting..."
	@cd frontend && npm run lint
	@cd server && npm run lint

# Deployment
deploy-dev:
	@echo "🚀 Deploying to development..."
	@chmod +x deploy.sh
	@./deploy.sh development

deploy-prod:
	@echo "🚀 Deploying to production..."
	@chmod +x deploy.sh
	@./deploy.sh production

# Kubernetes deployment
k8s-deploy:
	@echo "☸️  Deploying to Kubernetes..."
	@kubectl apply -f k8s/
	@kubectl rollout status deployment/ecotracker-app -n ecotracker

# Monitoring
monitor:
	@echo "📊 Opening monitoring dashboard..."
	@echo "Grafana: http://localhost:3000 (admin/admin)"
	@echo "Prometheus: http://localhost:9090"
	@open http://localhost:3000 || xdg-open http://localhost:3000 || echo "Please open http://localhost:3000"

# Database operations
db-migrate:
	@echo "🗄️  Running database migrations..."
	@docker-compose exec ecotracker npm run migrate

db-seed:
	@echo "🌱 Seeding database..."
	@docker-compose exec ecotracker npm run seed

# SSL certificate generation (for development)
ssl-cert:
	@echo "🔒 Generating SSL certificate..."
	@mkdir -p ssl
	@openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/CN=localhost"

# Health check
health:
	@echo "🔍 Checking application health..."
	@curl -f http://localhost/health || echo "❌ Health check failed"
	@curl -f http://localhost:3001/health || echo "❌ Backend health check failed"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@npm ci
	@cd frontend && npm ci
	@cd server && npm ci

# Update dependencies
update:
	@echo "🔄 Updating dependencies..."
	@npm update
	@cd frontend && npm update
	@cd server && npm update

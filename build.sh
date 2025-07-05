# Build script for production
#!/bin/bash

set -e

echo "🚀 Building EcoTracker for production..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is required but not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is required but not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Environment Configuration
NODE_ENV=production
PORT=3001

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AI Configuration
GEMINI_API_KEY=your-gemini-api-key-here

# Database
DATABASE_URL=sqlite:///app/data/database.sqlite

# CORS
CORS_ORIGIN=http://localhost,http://localhost:80

# Monitoring
GRAFANA_PASSWORD=admin
EOF
    echo "⚠️  Please update the .env file with your actual values before deployment!"
fi

# Build frontend
echo "🏗️  Building frontend..."
cd frontend
npm ci
npm run build
cd ..

# Build server
echo "🏗️  Building server..."
cd server
npm ci
npm run build
cd ..

# Build Docker images
echo "🐳 Building Docker images..."
docker-compose build

echo "✅ Build completed successfully!"
echo ""
echo "To start the application:"
echo "  docker-compose up -d"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the application:"
echo "  docker-compose down"

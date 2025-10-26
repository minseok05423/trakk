#!/bin/bash
# Development environment setup script

echo "🚀 Setting up Ski Tracker development environment..."

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed."; exit 1; }

echo "✅ Prerequisites met"

# Start databases
echo "Starting PostgreSQL and Redis..."
docker-compose up -d

# Install shared types
echo "Installing shared types..."
cd shared && npm install && npm run build && cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install && cd ..

# Install mobile dependencies
echo "Installing mobile dependencies..."
cd mobile && npm install && cd ..

# Create backend .env
if [ ! -f backend/.env ]; then
    echo "Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your AWS credentials"
fi

echo "✅ Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your AWS credentials"
echo "2. Run database migrations: cd backend && npm run migrate"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start worker: cd backend && npm run worker"
echo "5. Start mobile app: cd mobile && npm start"

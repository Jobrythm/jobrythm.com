#!/bin/bash

# Jobrythm.com Setup Script
# This script helps you set up the environment for the first time

set -e

echo "🚀 Jobrythm.com Setup Script"
echo "=============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Using existing .env file"
    else
        rm .env
    fi
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env from .env.example"
fi

echo ""
echo "🐳 Starting Docker containers..."
echo "This may take a few minutes on first run (building images)..."
echo ""

# Start Docker containers
docker compose up -d --build

echo ""
echo "⏳ Waiting for services to start..."

# Wait for the API to be ready
echo "⏳ Waiting for the analytics API to initialize..."
for i in {1..30}; do
    if docker compose logs api 2>/dev/null | grep -q "listening on port"; then
        echo "✅ Analytics API is ready!"
        break
    fi
    echo -n "."
    sleep 3
done

echo ""
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📍 Your application is running at:"
echo "   - Frontend:    http://localhost:8081"
echo "   - Admin panel: http://localhost:8081/admin-page"
echo ""
echo "🔐 Default Admin Credentials (change these in AdminLogin.tsx):"
echo "   - Email:    admin@example.com"
echo "   - Password: adminpassword"
echo ""
echo "📚 Useful Commands:"
echo "   - View logs:        docker compose logs -f"
echo "   - Stop services:    docker compose down"
echo "   - Restart:          docker compose restart"
echo "   - Update & rebuild: git pull && docker compose up -d --build"
echo ""
echo "📖 For more information, see README.md"
echo ""

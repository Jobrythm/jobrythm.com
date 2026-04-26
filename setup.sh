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
    
    # Generate secure random keys
    echo ""
    echo "🔐 Generating secure keys..."
    
    # Function to generate a random base64 string
    generate_key() {
        openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
    }
    
    # Generate keys
    KEY1=$(generate_key)
    KEY2=$(generate_key)
    KEY3=$(generate_key)
    KEY4=$(generate_key)
    API_SALT=$(generate_key)
    ADMIN_SECRET=$(generate_key)
    TRANSFER_SALT=$(generate_key)
    JWT_SECRET=$(generate_key)
    DB_PASSWORD=$(generate_key)
    
    # Update .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|APP_KEYS=.*|APP_KEYS=${KEY1},${KEY2},${KEY3},${KEY4}|" .env
        sed -i '' "s|API_TOKEN_SALT=.*|API_TOKEN_SALT=${API_SALT}|" .env
        sed -i '' "s|ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=${ADMIN_SECRET}|" .env
        sed -i '' "s|TRANSFER_TOKEN_SALT=.*|TRANSFER_TOKEN_SALT=${TRANSFER_SALT}|" .env
        sed -i '' "s|JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|" .env
        sed -i '' "s|DATABASE_PASSWORD=.*|DATABASE_PASSWORD=${DB_PASSWORD}|" .env
    else
        # Linux
        sed -i "s|APP_KEYS=.*|APP_KEYS=${KEY1},${KEY2},${KEY3},${KEY4}|" .env
        sed -i "s|API_TOKEN_SALT=.*|API_TOKEN_SALT=${API_SALT}|" .env
        sed -i "s|ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=${ADMIN_SECRET}|" .env
        sed -i "s|TRANSFER_TOKEN_SALT=.*|TRANSFER_TOKEN_SALT=${TRANSFER_SALT}|" .env
        sed -i "s|JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|" .env
        sed -i "s|DATABASE_PASSWORD=.*|DATABASE_PASSWORD=${DB_PASSWORD}|" .env
    fi
    
    echo "✅ Generated secure keys and saved to .env"
fi

echo ""
echo "🐳 Starting Docker containers..."
echo "This may take a few minutes on first run..."
echo ""

# Start Docker containers
docker compose up -d --build

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Wait for Strapi to be ready
echo "⏳ Waiting for Strapi to initialize (this may take 2-3 minutes)..."
for i in {1..60}; do
    if docker compose logs strapi | grep -q "Server started"; then
        echo "✅ Strapi is ready!"
        break
    fi
    echo -n "."
    sleep 5
done

echo ""
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📍 Your application is running at:"
echo "   - Frontend:      http://localhost"
echo "   - Strapi Admin:  http://localhost:1337/admin"
echo ""
echo "🔐 Default Admin Credentials:"
echo "   - Email:    admin@jobrythm.com"
echo "   - Password: adminpassword"
echo ""
echo "⚠️  IMPORTANT: Change the admin password after first login!"
echo ""
echo "📚 Useful Commands:"
echo "   - View logs:        docker compose logs -f"
echo "   - Stop services:    docker compose down"
echo "   - Restart:          docker compose restart"
echo "   - Update & rebuild: git pull && docker compose up -d --build"
echo ""
echo "📖 For more information, see README.md"
echo ""

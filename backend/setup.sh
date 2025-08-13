#!/bin/bash

echo "======================================"
echo "  Tradesman Finance Backend Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create logs directory
echo ""
echo "📁 Creating logs directory..."
mkdir -p logs

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "🔧 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file. Please edit it with your credentials."
else
    echo "✅ .env file already exists"
fi

# Check MongoDB
echo ""
echo "🔍 Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found. Please install MongoDB or use MongoDB Atlas (cloud)"
    echo "   Visit: https://www.mongodb.com/try/download/community"
fi

# Check Redis
echo ""
echo "🔍 Checking Redis..."
if command -v redis-server &> /dev/null; then
    echo "✅ Redis is installed"
else
    echo "⚠️  Redis not found. Please install Redis or use Redis Cloud"
    echo "   macOS: brew install redis"
    echo "   Ubuntu: sudo apt-get install redis-server"
fi

echo ""
echo "======================================"
echo "  Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys:"
echo "   - MongoDB connection string"
echo "   - SendGrid API key"
echo "   - Twilio credentials"
echo "   - GoHighLevel API key (optional)"
echo ""
echo "2. Start MongoDB and Redis:"
echo "   mongod --dbpath /usr/local/var/mongodb"
echo "   redis-server"
echo ""
echo "3. Start the backend server:"
echo "   npm run dev"
echo ""
echo "Need help? Check the README.md file."
echo ""
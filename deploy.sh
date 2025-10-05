#!/bin/bash

echo "🚀 Starting Quizify Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "Checking project structure..."

# Install backend dependencies
print_status "Installing backend dependencies..."
npm install || {
    print_error "Failed to install backend dependencies"
    exit 1
}

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd client && npm install || {
    print_error "Failed to install frontend dependencies"
    exit 1
}

# Build frontend
print_status "Building frontend for production..."
npm run build || {
    print_error "Frontend build failed"
    exit 1
}

cd ..

print_status "✨ Build completed successfully!"
print_warning "Next steps:"
echo "1. Deploy backend to Railway/Render/Heroku"
echo "2. Deploy frontend to Vercel/Netlify"
echo "3. Update environment variables"
echo "4. Test your deployed application"

echo ""
print_status "🎉 Ready for deployment!"
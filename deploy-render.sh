#!/bin/bash

echo "🚀 Deploying Quizify Backend to Render.com"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}💡 $1${NC}"
}

print_step "Step 1: Checking project setup..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run from project root."
    exit 1
fi
print_success "Project structure looks good!"

print_step "Step 2: Verifying build configuration..."
if [ ! -f "server/server.js" ]; then
    echo "❌ server/server.js not found."
    exit 1
fi
print_success "Server file found!"

print_step "Step 3: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

print_step "Step 4: Testing server start..."
timeout 10s npm start &
PID=$!
sleep 5
if ps -p $PID > /dev/null; then
    kill $PID
    print_success "Server starts successfully!"
else
    echo "❌ Server failed to start"
    exit 1
fi

echo ""
echo "🎉 Your project is ready for Render deployment!"
echo ""
print_info "Next steps:"
echo "1. Go to https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Use these settings:"
echo "   - Name: quizify-backend"
echo "   - Environment: Node"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
print_info "Environment Variables to add in Render Dashboard:"
echo "NODE_ENV=production"
echo "MONGO_URL=your_mongodb_connection_string_here"
echo "JWT_SECRET=your_super_secret_jwt_key_here"
echo "GEMINI_API_KEY=your_gemini_api_key_here"
echo "FRONTEND_URL=https://your-frontend.vercel.app"
echo "SERVE_FRONTEND=false"
echo ""
print_success "Your backend will be available at: https://quizify-backend.onrender.com"
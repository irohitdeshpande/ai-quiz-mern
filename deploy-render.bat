@echo off
echo 🚀 Deploying Quizify Backend to Render.com
echo ==========================================

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Please run from project root.
    exit /b 1
)
echo ✅ Project structure looks good!

:: Check server file
if not exist "server\server.js" (
    echo ❌ server\server.js not found.
    exit /b 1
)
echo ✅ Server file found!

:: Install dependencies
echo 📋 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Backend dependencies installed!

echo.
echo 🎉 Your project is ready for Render deployment!
echo.
echo 💡 Next steps:
echo 1. Go to https://render.com
echo 2. Sign up/Login with GitHub
echo 3. Click 'New Web Service'
echo 4. Connect your GitHub repository
echo 5. Use these settings:
echo    - Name: quizify-backend
echo    - Environment: Node
echo    - Build Command: npm install
echo    - Start Command: npm start
echo.
echo 💡 Environment Variables to add:
echo NODE_ENV=production
echo MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/quizify
echo JWT_SECRET=your_jwt_secret_here
echo GEMINI_API_KEY=your_gemini_api_key
echo FRONTEND_URL=https://your-frontend.vercel.app
echo.
echo ✅ Your backend will be available at: https://quizify-backend.onrender.com
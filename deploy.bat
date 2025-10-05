@echo off
echo 🚀 Starting Quizify Deployment Process...

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Please run this script from the project root directory.
    exit /b 1
)

echo ✅ Checking project structure...

:: Install backend dependencies
echo ✅ Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

:: Install frontend dependencies
echo ✅ Installing frontend dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

:: Build frontend
echo ✅ Building frontend for production...
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed
    exit /b 1
)

cd ..

echo ✨ Build completed successfully!
echo ⚠️  Next steps:
echo 1. Deploy backend to Railway/Render/Heroku
echo 2. Deploy frontend to Vercel/Netlify
echo 3. Update environment variables
echo 4. Test your deployed application
echo.
echo ✅ 🎉 Ready for deployment!
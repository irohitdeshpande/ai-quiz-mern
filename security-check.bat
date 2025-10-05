@echo off
echo 🔒 Pre-Commit Security Check
echo ============================

set SECURITY_ISSUES=0

echo 🔍 Checking for exposed API keys...

REM Check for MongoDB credentials
findstr /R /C:"mongodb+srv://.*:.*@" *.* >nul 2>&1
if %errorlevel%==0 (
    echo ❌ DANGER: MongoDB credentials found in files!
    set SECURITY_ISSUES=1
)

REM Check for Gemini API keys  
findstr /R /C:"AIza[A-Za-z0-9_-]" *.* >nul 2>&1
if %errorlevel%==0 (
    echo ❌ DANGER: Gemini API key found in files!
    set SECURITY_ISSUES=1
)

REM Check if .env is being tracked
git ls-files | findstr "\.env$" >nul 2>&1
if %errorlevel%==0 (
    echo ❌ DANGER: .env file is being tracked by git!
    set SECURITY_ISSUES=1
)

if %SECURITY_ISSUES%==0 (
    echo ✅ Security check passed! Safe to commit.
    exit /b 0
) else (
    echo ❌ SECURITY ISSUES FOUND! DO NOT COMMIT!
    echo 📝 Action needed:
    echo 1. Remove all sensitive data from tracked files
    echo 2. Use placeholder values in documentation  
    echo 3. Ensure .env files are in .gitignore
    echo 4. Set real values only in deployment platform
    exit /b 1
)
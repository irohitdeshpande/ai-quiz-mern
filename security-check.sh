#!/bin/bash

echo "🔒 Pre-Commit Security Check"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SECURITY_ISSUES=0

# Check for exposed API keys
echo -e "${YELLOW}🔍 Checking for exposed API keys...${NC}"

# Check for MongoDB credentials
if grep -r "mongodb+srv://.*:.*@" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null; then
    echo -e "${RED}❌ DANGER: MongoDB credentials found in files!${NC}"
    SECURITY_ISSUES=1
fi

# Check for JWT secrets (look for long hex strings)
if grep -r "JWT_SECRET.*[a-f0-9]{50,}" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null; then
    echo -e "${RED}❌ DANGER: JWT secret found in files!${NC}"
    SECURITY_ISSUES=1
fi

# Check for Gemini API keys
if grep -r "AIza[A-Za-z0-9_-]{35}" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null; then
    echo -e "${RED}❌ DANGER: Gemini API key found in files!${NC}"
    SECURITY_ISSUES=1
fi

# Check if .env is being tracked
if git ls-files | grep -q "\.env$"; then
    echo -e "${RED}❌ DANGER: .env file is being tracked by git!${NC}"
    SECURITY_ISSUES=1
fi

# Final verdict
if [ $SECURITY_ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ Security check passed! Safe to commit.${NC}"
    exit 0
else
    echo -e "${RED}❌ SECURITY ISSUES FOUND! DO NOT COMMIT!${NC}"
    echo -e "${YELLOW}📝 Action needed:${NC}"
    echo "1. Remove all sensitive data from tracked files"
    echo "2. Use placeholder values in documentation"
    echo "3. Ensure .env files are in .gitignore"
    echo "4. Set real values only in deployment platform"
    exit 1
fi
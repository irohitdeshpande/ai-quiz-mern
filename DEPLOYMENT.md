# 🚀 Quizify Deployment Guide

This guide covers deploying both frontend and backend of your Quizify application to production.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository pushed to GitHub
- MongoDB Atlas account (for production database)
- Google Gemini API key

## 🗂️ Deployment Options

### Option 1: Separate Deployments (Recommended)
- **Backend**: Railway, Render, or Heroku
- **Frontend**: Vercel or Netlify

### Option 2: Full-Stack Deployment
- **Full-Stack**: Render (hosts both frontend and backend)

---

## 🔧 Backend Deployment

### Option A: Railway (Recommended)

1. **Create Railway Account**: Go to [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   ```bash
   # Connect your GitHub repository
   # Railway will auto-detect Node.js and use railway.json config
   ```

3. **Set Environment Variables**:
   ```env
   NODE_ENV=production
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/quizify
   JWT_SECRET=your_super_secret_jwt_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   PORT=5000
   ```

4. **Custom Domain** (Optional):
   - Add custom domain in Railway dashboard
   - Update CORS settings if needed

### Option B: Render

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect GitHub repository
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node.js

3. **Environment Variables**: Same as Railway above

### Option C: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Deploy**:
   ```bash
   heroku create your-app-name-backend
   git push heroku main
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URL=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set GEMINI_API_KEY=your_gemini_api_key
   heroku config:set FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

---

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended)

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com)

2. **Deploy from GitHub**:
   - Import your repository
   - Framework: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Environment Variables**:
   ```env
   REACT_APP_API_URL=https://your-backend-domain.railway.app
   ```

4. **Build Settings**:
   - Build Command: `npm install && npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Option B: Netlify

1. **Create Netlify Account**: Go to [netlify.com](https://netlify.com)

2. **Deploy Settings**:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`

3. **Environment Variables**: Same as Vercel

### Option C: Frontend with Backend (Render Full-Stack)

1. **Use Render Web Service**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - The backend serves the built React app

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: [mongodb.com/atlas](https://www.mongodb.com/atlas)

2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to your backend

3. **Setup Database Access**:
   - Create database user
   - Add IP addresses (0.0.0.0/0 for all IPs)

4. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/quizify
   ```

---

## 🔐 Environment Variables Guide

### Backend Environment Variables

Create `.env` file in server directory:

```env
# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/quizify

# Authentication
JWT_SECRET=your_very_secure_random_string_here

# AI Service
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio

# CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Server
NODE_ENV=production
PORT=5000
```

### Frontend Environment Variables

Create `.env` file in client directory:

```env
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

---

## 🚀 Deployment Scripts

### Quick Deployment Commands

```bash
# Install dependencies and build
npm run build

# Deploy to production
npm run deploy
```

---

## ✅ Pre-Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created and accessible
- [ ] All environment variables set
- [ ] CORS configured for your frontend domain
- [ ] JWT secret is secure and unique
- [ ] Gemini API key is valid

### Frontend
- [ ] API URL environment variable set
- [ ] Build completes without errors
- [ ] All API endpoints are accessible
- [ ] Authentication flow works

---

## 🔧 Post-Deployment Testing

1. **Test Registration**:
   - Create admin account
   - Create user account
   - Verify role selection works

2. **Test Authentication**:
   - Login with both account types
   - Verify protected routes work
   - Check JWT token generation

3. **Test Core Features**:
   - Admin: Create exam, add questions, AI generation
   - User: Take exam, view results, see reports

4. **Test CORS**:
   - Verify frontend can communicate with backend
   - Check all API calls work

---

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Update FRONTEND_URL in backend environment
   - Check CORS configuration in server.js

2. **Database Connection**:
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format
   - Ensure database user has correct permissions

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

4. **API Connection Issues**:
   - Verify REACT_APP_API_URL is correct
   - Check if backend is running and accessible
   - Test API endpoints directly

### Debug Commands

```bash
# Check backend deployment
curl https://your-backend-domain.railway.app/api/users/test

# Check frontend build
cd client && npm run build

# Test local connection
npm run dev
```

---

## 🎯 Production URLs

After successful deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **Database**: MongoDB Atlas cluster

## 🔄 Continuous Deployment

Both Vercel and Railway support automatic deployments:
- Push to `main` branch triggers automatic deployment
- Environment variables persist across deployments
- Zero-downtime deployments

---

## 📞 Support

If you encounter issues:
1. Check deployment logs in your hosting platform
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Check CORS configuration

Your Quizify application is now ready for production! 🎉
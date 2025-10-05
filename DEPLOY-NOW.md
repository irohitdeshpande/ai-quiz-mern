<!-- # 🚀 Step-by-Step Deployment Guide

## Prerequisites ✅
- [x] Updated AI service to new SDK
- [x] Secured all sensitive data
- [x] Environment variables properly configured

## Step 1: Commit and Push to GitHub

```bash
# 1. Add all changes
git add .

# 2. Commit with a meaningful message
git commit -m "feat: upgrade to Gemini 2.5-flash API and secure deployment configs"

# 3. Push to GitHub
git push origin main
```

## Step 2: Deploy Backend to Render.com

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### 2.2 Create Web Service
1. Click **"New"** → **"Web Service"**
2. Select your `ai-quiz-mern` repository
3. Configure the service:

```
Name: ai-quiz-backend
Environment: Node
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave empty)
Build Command: npm install
Start Command: npm start
```

### 2.3 Add Environment Variables
In the Render dashboard, go to **Environment** tab and add:

```env
NODE_ENV=production
MONGO_URL=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=https://your-frontend.vercel.app
SERVE_FRONTEND=false
```

**⚠️ IMPORTANT: Use your actual values from server/.env file when setting these in Render dashboard!**

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://ai-quiz-backend.onrender.com`

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### 3.2 Deploy Frontend
1. Click **"New Project"**
2. Import your `ai-quiz-mern` repository
3. Configure:

```
Framework Preset: Create React App
Root Directory: client
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 3.3 Add Environment Variable
In Vercel dashboard, go to **Settings** → **Environment Variables**:

```env
REACT_APP_API_URL=https://ai-quiz-backend.onrender.com
```
*(Replace with your actual Render backend URL)*

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for build completion
3. Note your frontend URL: `https://ai-quiz-frontend.vercel.app`

## Step 4: Update CORS Configuration

1. Go back to your **Render dashboard**
2. Update the `FRONTEND_URL` environment variable:
```env
FRONTEND_URL=https://ai-quiz-frontend.vercel.app
```
*(Replace with your actual Vercel URL)*

3. Save and redeploy

## Step 5: Test Your Deployment

### Backend Health Check
Visit: `https://your-backend.onrender.com/health`
Should return: `{"status": "OK", "timestamp": "..."}`

### Frontend Test
1. Visit your Vercel URL
2. Try registering a new user
3. Login and test features
4. Create an exam and test AI question generation

## 🎯 Quick Commands

```bash
# Commit and push
git add .
git commit -m "feat: upgrade to Gemini 2.5-flash and secure configs"
git push origin main

# Test backend locally (optional)
cd server
npm install
npm start

# Test frontend locally (optional)
cd client
npm install
npm start
```

## 🔧 Troubleshooting

### Backend Issues:
- Check Render logs in dashboard
- Verify all environment variables are set
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### Frontend Issues:
- Check Vercel build logs
- Verify `REACT_APP_API_URL` points to your Render backend
- Check browser console for CORS errors

### AI Service Issues:
- Verify `GEMINI_API_KEY` is valid
- Check if Google AI Studio API is enabled
- Monitor Render logs for Gemini API errors

## 🎉 Success Indicators

- ✅ Backend health endpoint responds
- ✅ Frontend loads without errors
- ✅ User registration/login works
- ✅ Admin can create exams
- ✅ AI question generation works
- ✅ Users can take exams
- ✅ Reports are generated

## 🔒 Security Notes

- Never commit `.env` files
- Use environment variables in production
- Keep API keys secure
- Monitor usage quotas

---

**Ready to deploy?** Start with Step 1 above! 🚀 -->
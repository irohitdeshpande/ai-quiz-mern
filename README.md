# 🎯 Quizify: AI-Powered Quiz Application

[![Deploy Status](https://img.shields.io/badge/Deploy-Live-brightgreen)](https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue)](https://quizify-backend.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black)](https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app)

## 🚀 Live Application
- **Frontend**: [https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app](https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app)
- **Backend API**: [https://quizify-backend.onrender.com](https://quizify-backend.onrender.com)
- **Health Check**: [https://quizify-backend.onrender.com/health](https://quizify-backend.onrender.com/health)

## 📝 Overview
An interactive MERN stack quiz application that uses **Google Gemini AI** to generate dynamic quiz questions. Features role-based authentication, real-time question generation, and comprehensive analytics for educators.

## ⚡ Tech Stack
- **Frontend:** React 18.3.1, Redux Toolkit, Ant Design 5.21.6
- **Backend:** Node.js 22+, Express.js 4.21.1
- **Database:** MongoDB Atlas with Mongoose 8.8.0
- **AI:** Google Gemini 2.5-Flash API
- **Authentication:** JWT + bcryptjs
- **Deployment:** Vercel (Frontend) + Render (Backend)

## Database Structure
### Users
- **name:** User’s full name
- **email:** Unique email
- **password:** Hashed password
- **isAdmin:** Admin status

### Exams
- **name:** Exam title
- **duration:** Time limit in minutes
- **category:** Subject category
- **totalMarks:** Maximum marks
- **passingMarks:** Minimum passing marks
- **questions:** Linked questions

### Questions
- **name:** Question text
- **correctOption:** Correct answer
- **options:** Answer options
- **exam:** Linked exam

### Reports
- **user:** Linked user
- **exam:** Linked exam
- **result:** User’s score and answers

## Features
- **User Registration:** Secure registration with hashed passwords
- **AI Question Generation:** Dynamic questions using Gemini API
- **Quiz Storage:** Store quizzes and responses in MongoDB
- **Analytics:** Educator dashboard with performance insights

## 🚀 Quick Start

### For Users
Simply visit the live application: [Quizify App](https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app)

1. **Register** - Choose your role (User/Admin)
2. **Login** - Access your dashboard
3. **Start Learning** - Take quizzes or create them (Admin)

### For Developers

1. **Clone the repository:**
   ```bash
   git clone https://github.com/irohitdeshpande/ai-quiz-mern.git
   cd ai-quiz-mern
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Environment Setup:**
   Create `server/.env` file:
   ```env
   MONGO_URL=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run locally:**
   ```bash
   # Backend (Port 5000)
   npm start
   
   # Frontend (Port 3000) - in another terminal
   cd client && npm start
   ```

## 🌐 Deployment

This application is deployed using:
- **Backend**: [Render.com](https://render.com) - `https://quizify-backend.onrender.com`
- **Frontend**: [Vercel](https://vercel.com) - `https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app`
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

### Environment Variables (Production)
```env
NODE_ENV=production
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_production_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend.vercel.app
SERVE_FRONTEND=false
```

## 🎮 How to Use

### As a Student (User)
1. Register with role "User"
2. Browse available exams
3. Take timed quizzes
4. View your results and performance

### As an Educator (Admin)
1. Register with role "Admin"
2. Create new exams with categories
3. Add questions manually or use AI generation
4. Monitor student performance through reports

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Exams
- `GET /api/exams/get-all-exams` - Get all exams
- `POST /api/exams/add-exam` - Create new exam (Admin)
- `GET /api/exams/get-exam-by-id/:id` - Get exam details

### Questions
- `POST /api/exams/add-question-to-exam` - Add question to exam
- `POST /api/exams/generate-questions` - AI question generation

### Reports
- `POST /api/reports/add-report` - Submit exam results
- `GET /api/reports/get-all-reports` - Get all reports (Admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rohit Deshpande**
- GitHub: [@irohitdeshpande](https://github.com/irohitdeshpande)
- Live App: [Quizify](https://quizify-ai-git-main-rohit-deshpandes-projects.vercel.app)

---

⭐ **Star this repository if you found it helpful!**

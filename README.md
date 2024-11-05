# Quizify: AI-powered Quiz Application

## Objective
Build an interactive quiz app that personalizes quizzes based on user skills and preferences using the Gemini API. Supports students with targeted questions and allows educators to manage quizzes and track performance.

## Tech Stack
- **Frontend:** React.js, CSS, HTML, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** Gemini API
- **Tools:** Mongoose, JWT, bcrypt

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

## Setup Instructions
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/Quiz-Application.git
    cd Quiz-Application
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

4. **Run the application:**
    ```bash
    npm run dev
    ```

## How to Run
1. **Start the backend server:**
    ```bash
    npm run server
    ```

2. **Start the frontend development server:**
    ```bash
    cd client
    npm start
    ```

3. **Access the application:**
    Open `http://localhost:3000` in your browser.

Enjoy your personalized quiz experience!

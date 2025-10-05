const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const resportsRoute = require("./routes/reportsRoute");
const generateRoute = require("./routes/generateRoute");

const cors = require("cors");

// Configure CORS for both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://quizify-ai-flax.vercel.app',
      'https://ai-quiz-mern-frontend.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origin not allowed by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", resportsRoute);
app.use("/api/generate", generateRoute);
const port = process.env.PORT || 5000;

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Quizify Backend API is running!",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "API is working correctly",
    database: "Connected",
    services: ["Authentication", "Exams", "Reports", "AI Generation"]
  });
});

const path = require("path");
__dirname = path.resolve();

// Only serve static files if client build directory exists
if (process.env.NODE_ENV === "production" && process.env.SERVE_FRONTEND === "true") {
  const clientBuildPath = path.join(__dirname, "client", "build");
  
  // Check if build directory exists
  try {
    require('fs').accessSync(clientBuildPath);
    app.use(express.static(clientBuildPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(clientBuildPath, "index.html"));
    });
    console.log("Frontend build files found and served");
  } catch (error) {
    console.log("Frontend build directory not found - running as API-only server");
  }
} 


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// user registration

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Name, email, and password are required",
        success: false,
      });
    }

    // Validate role
    const validRoles = ['user', 'admin'];
    const userRole = role || 'user';
    if (!validRoles.includes(userRole)) {
      return res.status(400).send({
        message: "Invalid role. Must be 'user' or 'admin'",
        success: false,
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).send({ 
        message: "User with this email already exists", 
        success: false 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).send({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: userRole,
      isAdmin: userRole === 'admin'
    };

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).send({
      message: `${userRole === 'admin' ? 'Admin' : 'User'} account created successfully`,
      success: true,
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).send({
        message: validationErrors.join(', '),
        success: false,
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).send({
        message: "Email address is already registered",
        success: false,
      });
    }

    res.status(500).send({
      message: "Server error during registration. Please try again.",
      success: false,
    });
  }
});

// user login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
        success: false,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).send({ 
        message: "Invalid email or password", 
        success: false 
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ 
        message: "Invalid email or password", 
        success: false 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // Send success response with user info
    res.send({
      message: `Welcome back, ${user.name}!`,
      success: true,
      data: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({
      message: "Server error during login. Please try again.",
      success: false,
    });
  }
});

// get user info

router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;

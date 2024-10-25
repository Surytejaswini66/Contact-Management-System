// controllers/authController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registration handler function
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Registration logic here
  res.json({ message: "User registered. Please check your email to verify." });
};

// Password reset request handler function
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  // Password reset logic here
  res.json({ message: "Password reset link sent." });
};

// Export the handler functions
module.exports = { registerUser, requestPasswordReset };

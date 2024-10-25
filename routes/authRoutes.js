// routes/authRoutes.js

const express = require("express");
const {
  registerUser,
  requestPasswordReset,
} = require("../controllers/authController");
const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for requesting password reset
router.post("/request-reset", requestPasswordReset);

module.exports = router;

// server.js or index.js

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Use the auth routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));

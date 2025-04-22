const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load env variables
connectDB(); // Connect to MongoDB

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route - Returns Today's Word
app.get("/api/word", (req, res) => {
  res.json({ word: "WATER" }); // Update as needed
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

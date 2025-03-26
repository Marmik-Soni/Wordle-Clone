const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route - Returns Today's Word
app.get("/api/word", (req, res) => {
  res.json({ word: "TASTE" }); // You can change "HELLO" to any word
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

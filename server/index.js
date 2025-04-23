const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios for external API calls
const connectDB = require("./config/db");
const fs = require("fs"); // Import file system module

dotenv.config(); // Load environment variables
connectDB();     // Connect to MongoDB

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store used words in memory
let usedWords = [];

// API Route - Returns Today's Word
app.get("/api/word", (req, res) => {
  res.json({ word: "WATER" }); // Update as needed
});

// API Route - Fetch a random 5-letter word that hasn't been used
app.get("/api/random-word", async (req, res) => {
  try {
    // Correct the file path to match the actual location of words.json
    const wordsData = JSON.parse(fs.readFileSync("./data/words.json", "utf-8")); // Adjusted path
    const words = wordsData.words;

    // Filter out words that have already been used
    const availableWords = words.filter((word) => !usedWords.includes(word));

    if (availableWords.length === 0) {
      return res.status(500).json({ error: "No more words available." });
    }

    // Pick a random word from the available words
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];

    // Add the word to the used words list
    usedWords.push(randomWord);

    console.log(`Fetched word: ${randomWord}`); // Log the word to the console
    res.json({ word: randomWord });
  } catch (error) {
    console.error("Error fetching random word:", error);
    res.status(500).json({ error: "Failed to fetch random word" });
  }
});

// API Route - Validate if a word exists using an external dictionary API
app.get("/api/validate/:word", async (req, res) => {
  const { word } = req.params;
  try {
    // Use the dictionary API to check if the word exists
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.data && response.data.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error("Error validating word:", error);
    res.json({ valid: false }); // Return false if the word is not found
  }
});

// API Route - Reset used words (for testing or restarting the game)
app.post("/api/reset-words", (req, res) => {
  usedWords = []; // Clear the used words list
  console.log("Used words list has been reset.");
  res.json({ message: "Used words list has been reset." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// importing necessary libraries and hooks
import React, { useState, useEffect } from "react";
import axios from "axios";

// Importing components
import Header from "../Components/header";
import Keyboard from "../Components/keyboard";
import HowToPlay from "../Components/howToPlay";

function Game() {
  // State to store the guesses made by the player
  const [guesses, setGuesses] = useState(
    Array(6)
      .fill("")
      .map(() => Array(5).fill(""))
  );

  // State to track the current row the player is working on
  const [currentRow, setCurrentRow] = useState(0);

  // State to track the current column the player is working on
  const [currentCol, setCurrentCol] = useState(0);

  // State to store the correct word fetched from the server
  const [correctWord, setCorrectWord] = useState("");

  // State to determine if the game is over
  const [gameOver, setGameOver] = useState(false);

  // State to store the colors of each cell based on correctness
  const [cellColors, setCellColors] = useState(
    Array(6)
      .fill("")
      .map(() => Array(5).fill(""))
  );

  // State to track the status of each letter for the keyboard (e.g., green, yellow, gray)
  const [letterStatuses, setLetterStatuses] = useState({});

  // State to show/hide the HowToPlay popup
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  // Function to toggle the HowToPlay modal
  const toggleHowToPlay = () => {
    setShowHowToPlay((prev) => !prev);
  };

  // Fetch the correct word from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/random-word") // Use the random word API
      .then((res) => {
        const word = res.data.word.toUpperCase();
        if (word.length === 5) {
          setCorrectWord(word); // Set the word only if it's 5 letters long
        } else {
          console.error("Fetched word is not 5 letters long:", word);
          setErrorMessage("Error: Invalid word length. Please refresh.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch word:", err);
        setErrorMessage("Error fetching word. Please try again.");
      });
  }, []);

  // Update the status of letters on the keyboard based on the player's guess
  const updateLetterStatuses = (guessWord, rowColors) => {
    const newStatuses = { ...letterStatuses };

    for (let i = 0; i < guessWord.length; i++) {
      const letter = guessWord[i];
      const color = rowColors[i];

      const currentStatus = newStatuses[letter];
      // Update the status only if it's more accurate (e.g., green > yellow > gray)
      if (
        color === "green" ||
        (color === "yellow" && currentStatus !== "green") ||
        (color === "gray" && !currentStatus)
      ) {
        newStatuses[letter] = color;
      }
    }

    setLetterStatuses(newStatuses);
  };

  // Handle key presses for the game
  const handleKeyPress = (key) => {
    if (gameOver) return; // Ignore input if the game is over

    if (key === "ENTER") {
      // Handle the ENTER key to submit a guess
      if (currentCol === 5) {
        const guessWord = guesses[currentRow].join("");

        // Validate the word before proceeding
        axios
          .get(`http://localhost:5000/api/validate/${guessWord.toLowerCase()}`) // Validate word
          .then((res) => {
            if (res.data.valid) {
              // If the word is valid, proceed with the existing logic
              const newColors = [...cellColors];
              const rowColors = Array(5).fill("");
              const correctWordLetterCount = {};

              // Count occurrences of each letter in the correct word
              for (const letter of correctWord) {
                correctWordLetterCount[letter] = (correctWordLetterCount[letter] || 0) + 1;
              }

              // First pass: Mark green (correct letter in the correct position)
              for (let i = 0; i < 5; i++) {
                if (guessWord[i] === correctWord[i]) {
                  rowColors[i] = "green";
                  correctWordLetterCount[guessWord[i]]--;
                }
              }

              // Second pass: Mark yellow (correct letter in the wrong position)
              for (let i = 0; i < 5; i++) {
                if (rowColors[i] === "") {
                  if (correctWord.includes(guessWord[i]) && correctWordLetterCount[guessWord[i]] > 0) {
                    rowColors[i] = "yellow";
                    correctWordLetterCount[guessWord[i]]--;
                  } else {
                    rowColors[i] = "gray";
                  }
                }
              }

              newColors[currentRow] = rowColors;
              setCellColors(newColors);
              updateLetterStatuses(guessWord, rowColors);

              // Check if the player has won or if the game is over
              if (guessWord === correctWord) {
                setGameOver(true);
              } else if (currentRow === 5) {
                setGameOver(true);
              } else {
                setCurrentRow((prev) => prev + 1);
                setCurrentCol(0);
              }
            } else {
              // If the word is invalid, show an error message
              setErrorMessage("Word doesn't exist");
              setTimeout(() => setErrorMessage(""), 3000); // Clear the message after 3 seconds
            }
          })
          .catch((err) => {
            console.error("Error validating word:", err);
            setErrorMessage("Error validating word");
            setTimeout(() => setErrorMessage(""), 3000);
          });
      }
    } else if (key === "BACKSPACE") {
      // Handle the BACKSPACE key to delete a letter
      if (currentCol > 0) {
        const newGuesses = [...guesses];
        newGuesses[currentRow][currentCol - 1] = ""; // Clear the last letter
        setGuesses(newGuesses);
        setCurrentCol(currentCol - 1); // Move back one column
      }
    } else if (/^[A-Z]$/.test(key) && currentCol < 5) {
      // Handle letter keys to input a letter
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol] = key; // Add the letter to the current cell
      setGuesses(newGuesses);
      setCurrentCol(currentCol + 1); // Move to the next column
    }
  };

  // Add a keydown event listener to handle keyboard input
  useEffect(() => {
    const keyHandler = (e) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler); // Cleanup on unmount
  });

  return (
    <>
      {/* Render the header component */}
      <Header onHowToPlayClick={toggleHowToPlay} />

      {/* Render the game container */}
      <div className="game-container">
        
        {/* Render the word grid */}
        <div className="word-grid">
          {guesses.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((letter, colIdx) => (
                <div
                  key={colIdx}
                  className={`grid-cell ${cellColors[rowIdx][colIdx]}`} // Apply cell color based on correctness
                >
                  {letter} {/* Display the letter in the cell */}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Display GAME OVER message if the game is over */}
        {gameOver && (
          <div className="game-over">
            {guesses[currentRow].join("") === correctWord
              ? "🎉 You Win!" // Display win message if the word is guessed correctly
              : `Game Over Bro! The word was "${correctWord}"`}
            {/* Display the correct word if the player loses */}
          </div>
        )}
        
        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Render the keyboard component and pass the onKeyPress handler and letterStatuses */}
        <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />

        {/* Modal and backdrop rendering */}
        {showHowToPlay && (
          <>
            {/* Backdrop for the modal */}
            <div className="backdrop" onClick={toggleHowToPlay}></div>

            {/* HowToPlay modal component */}
            <HowToPlay onClose={toggleHowToPlay} />
          </>
        )}
      </div>
    </>
  );
}

export default Game;

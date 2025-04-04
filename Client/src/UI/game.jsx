import React, { useState, useEffect } from "react";

// Importing components
import Header from "../Components/header";
import Keyboard from "../Components/keyboard";

function Game() {
  const [guesses, setGuesses] = useState(Array(6).fill("").map(() => Array(5).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  // Handles key presses (onscreen + physical)
  const handleKeyPress = (key) => {
    if (key === "ENTER") {
      if (currentCol === 5) {
        setCurrentRow((prev) => prev + 1);
        setCurrentCol(0);
      }
    } else if (key === "BACKSPACE") {
      if (currentCol > 0) {
        const newGuesses = [...guesses];
        newGuesses[currentRow][currentCol - 1] = "";
        setGuesses(newGuesses);
        setCurrentCol((prev) => prev - 1);
      }
    } else if (/^[A-Z]$/.test(key) && currentCol < 5) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol] = key;
      setGuesses(newGuesses);
      setCurrentCol((prev) => prev + 1);
    }
  };

  // Listen to physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses, currentRow, currentCol]);

  return (
    <>
      <Header />
      <div className="game-container">
        <div className="word-grid">
          {guesses.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((letter, colIndex) => (
                <div key={colIndex} className="grid-cell">{letter}</div>
              ))}
            </div>
          ))}
        </div><br />
        <Keyboard onKeyPress={handleKeyPress} />
      </div>
    </>
  );
}

export default Game;

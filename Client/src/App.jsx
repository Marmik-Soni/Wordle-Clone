import { useState,useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/word")
      .then((response) => response.json())
      .then((data) => setWord(data.word))
      .catch((error) => console.error("Error fetching word:", error));
  }, []);

  return (
    <>
      <div className="app">
        <h1>Wordle Game!</h1>
        <p>Today's Word: {word ? word : "Loading..."}</p>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";

const Game = () => {
    const [word, setWord] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/word")
            .then((res) => res.json())
            .then((data) => setWord(data.word))
            .catch((err) => console.error("Error fetching word:", err));
    }, []);

    return (
        <div className="game">
            <p>Today's word: {word ? word:"Loading../"}</p>
        </div>
    );
};

export default Game;

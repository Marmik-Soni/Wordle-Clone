import React, { useEffect } from "react";

function HowToPlay({ onClose }) {
    // Close the modal when the ESC key is pressed
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose(); // Call the onClose function passed as a prop
            }
        };
        document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown
        return () => document.removeEventListener("keydown", handleKeyDown); // Cleanup event listener on component unmount
    }, [onClose]);

    // Close the modal when clicking outside of it (on the overlay)
    const handleOverlayClick = (e) => {
        if (e.target.className.includes("how-to-play-overlay")) {
            onClose(); // Call the onClose function passed as a prop
        }
    };

    return (
        // Overlay to darken the background when the modal is open
        <div className="how-to-play-overlay" onClick={handleOverlayClick}>
            {/* Modal content */}
            <div className="how-to-play-modal" onClick={(e) => e.stopPropagation()}>
                {/* Modal header with title and close button */}
                <div className="modal-header">
                    <h2>How To Play</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {/* Instructions for the game */}
                <p>Guess the Wordle in 6 tries.</p>
                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>
                        The color of the tiles will change to show how close your guess was
                        to the word.
                    </li>
                </ul>

                {/* Examples section */}
                <h3>Examples</h3>

                {/* Example 1: Correct letter in the correct spot */}
                <div className="example">
                    <div className="tiles">
                        <span className="tile green">W</span>
                        <span className="tile">O</span>
                        <span className="tile">R</span>
                        <span className="tile">D</span>
                        <span className="tile">Y</span>
                    </div>
                    <p>
                        <strong>W</strong> is in the word and in the correct spot.
                    </p>
                </div>

                {/* Example 2: Correct letter in the wrong spot */}
                <div className="example">
                    <div className="tiles">
                        <span className="tile">L</span>
                        <span className="tile yellow">I</span>
                        <span className="tile">G</span>
                        <span className="tile">H</span>
                        <span className="tile">T</span>
                    </div>
                    <p>
                        <strong>I</strong> is in the word but in the wrong spot.
                    </p>
                </div>

                {/* Example 3: Letter not in the word */}
                <div className="example">
                    <div className="tiles">
                        <span className="tile">R</span>
                        <span className="tile">O</span>
                        <span className="tile">G</span>
                        <span className="tile black">U</span>
                        <span className="tile">E</span>
                    </div>
                    <p>
                        <strong>U</strong> is not in the word in any spot.
                    </p>
                </div>

                {/* Reminder section */}
                <p className="reminder">
                    A new puzzle is released daily at midnight. <br />
                    If you haven’t already,
                    you can <a href="#">sign up</a> for our daily reminder email.
                </p>
            </div>
        </div>
    );
}

export default HowToPlay;

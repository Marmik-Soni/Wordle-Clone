import React from "react";

function Keyboard({ onKeyPress }) {
  const keys = ["QWERTYUIOP", "ASDFGHJKL"];

  return (
    <div className="keyboard">
      {/* Top two rows */}
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((key) => (
            <button key={key} className="key" onClick={() => onKeyPress(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}

      {/* Bottom row with ENTER -> Z to M -> BACKSPACE */}
      <div className="keyboard-row">
        <button className="key special-key" onClick={() => onKeyPress("ENTER")}>
          ENTER
        </button>
        {"ZXCVBNM".split("").map((key) => (
          <button key={key} className="key" onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
        <button className="key special-key" onClick={() => onKeyPress("BACKSPACE")}>
          ⌫
        </button>
      </div>
    </div>
  );
}

export default Keyboard;

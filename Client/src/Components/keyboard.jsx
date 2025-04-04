import React from "react";

function Keyboard({ onKeyPress, letterStatuses }) {
  const keys = ["QWERTYUIOP", "ASDFGHJKL"];

  const getKeyClass = (key) => {
    const status = letterStatuses?.[key];
    if (status === "green") return "key green";
    if (status === "yellow") return "key yellow";
    if (status === "gray") return "key gray";
    return "key";
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="keyboard-row">
        <button className="key special-key" onClick={() => onKeyPress("ENTER")}>
          ENTER
        </button>
        {"ZXCVBNM".split("").map((key) => (
          <button
            key={key}
            className={getKeyClass(key)}
            onClick={() => onKeyPress(key)}
          >
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

import { useState, useEffect } from "react";

function LoadingScreen({ onFadeOut }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFadeOut, 500);
    }, 650);

    return () => clearTimeout(timer);
  }, [onFadeOut]);

  return (
    <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
      <img
        src="/Assets/Images/WordleLogo.png"
        alt="Wordle Logo"
        className="loading-logo"
      />
      <p className="loading-name">Wordle</p>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingScreen;

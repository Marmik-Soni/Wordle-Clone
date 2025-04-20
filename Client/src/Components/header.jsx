import React from "react";

const Header = ({ onHowToPlayClick }) => {
  const handleBugReport = () => {
    const subject = encodeURIComponent("Bug Report");
    const body = encodeURIComponent("Describe the issue here...");
    const email = "marmiksoni777@gmail.com";

    // Simple mobile detection
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // This opens the default mail app (like Gmail) on mobile
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      // This opens Gmail in browser compose window on desktop
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
        "_blank"
      );
    }
  };

  return (
    <header className="header">
      {/* Hamburger Icon */}
      <img src="Assets/icons/hamburger.png" alt="Menu" className="icon menu-icon" />

      {/* Right Side Logos */}
      <div className="header-icons">
        {/* How to Play button */}
        <img src="Assets/icons/lightbulb.png" alt="How to Play" className="icon" onClick={onHowToPlayClick}/>

        {/* Statistics button */}
        <img src="Assets/icons/chart.png" alt="Statistics" className="icon" />

        {/* GitHub button */}
        <a href="https://github.com/Marmik-Soni/Wordle-Clone" target="_blank" rel="noopener noreferrer">
          <img src="Assets/icons/github.png" alt="GitHub Repo" className="icon" />
        </a>

        {/* Report a Bug button */}
        <button className="icon-button" onClick={handleBugReport}>
          <img src="Assets/icons/exclamation.png" alt="Report a Bug" className="icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;

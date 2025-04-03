import React from "react";

const Header = () => {
  return (
    <header className="header">
      {/* Hamburger Icon */}
      <img src="Assets\icons\hamburger.png" alt="Menu" className="icon menu-icon" />

      {/* Right Side Logos */}
      <div className="header-icons">
        {/* How to Play button */}
        <img src="Assets\icons\lightbulb.png" alt="How to Play" className="icon" />

        {/* Statistics button */}
        <img src="Assets\icons\chart.png" alt="Statistics" className="icon" />

        {/* GitHub button */}
        <a href="https://github.com/Marmik-Soni/Wordle-Clone" target="_blank" rel="noopener noreferrer">
          <img src="Assets\icons\github.png" alt="GitHub Repo" className="icon" />
        </a>

        {/* Report a Bug button */}
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=marmiksoni777@gmail.com&su=Bug Report&body=Describe the issue here..." target="_blank" rel="noopener noreferrer">
          <img src="Assets\icons\exclamation.png" alt="Report a Bug" className="icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;

function LandingPage() {
  // Get today's date in "Month Day, Year" format
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <header className="home">
        <div className="home-logo">
          <img className="logo" src="Assets/Images/WordleLogo.png" />
        </div>

        <h1 className="home-title">Wordle</h1>
        <p className="home-desc">
          Get 6 changes to <br />
          guess the 5-letter word.
        </p>

        <div className="button-container">
          <button className="button-stats">Stats</button>
          <button className="button-play">Play</button>
        </div>

        {/* Date Display on the Left */}
        <p className="date-display">{today}</p>

        <p className="edited-by">
                    Edited by{" "}
                    <a href="https://www.linkedin.com/in/marmiksoni" target="_blank" rel="noopener noreferrer">
                        Marmik Soni
                    </a>
                </p>
      </header>
    </>
  );
}

export default LandingPage;

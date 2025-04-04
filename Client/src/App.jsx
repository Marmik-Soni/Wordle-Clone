// Importing React router and useState
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Importing CSS
import "./App.css";

// Importing Pages
import Game from "./UI/game";
import LandingPage from "./UI/landngPage";
import LoadingScreen from "./UI/loadingScreen";

function App() {
  const [showLoading, setShowLoading] = useState(true);
  return (
    <>
    {showLoading ? (
        <LoadingScreen onFadeOut={() => setShowLoading(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      )}
    </>
  );
}

export default App;

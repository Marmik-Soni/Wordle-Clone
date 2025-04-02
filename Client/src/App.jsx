// Importing React and CSS
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Importing components
import Game from "./UI/game";
import Header from "./UI/Header";
import LandingPage from "./UI/landngPage";

// Importing Router
// import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<Game />} />
      <Route path="" element={<Header />} />
    </Routes>
    </>
  );
}

export default App;

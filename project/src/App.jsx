import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/homepage";
import Hangman from "./components/hangman";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Hangman />} />
      </Routes>
    </Router>
  );
}

export default App;

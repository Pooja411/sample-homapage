import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem("playerName") || "");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    // For stars
    const starsContainer = document.querySelector(".stars");
    if (starsContainer) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = Math.random() * 3 + "px";
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        starsContainer.appendChild(star);
      }
    }

    // For planet and meteor
    const container = document.querySelector(".space-container");
    if (container) {
      const createMeteor = () => {
        const meteor = document.createElement("div");
        meteor.className = "meteor";
        meteor.style.top = Math.random() * 50 + "%";
        container.appendChild(meteor);
        setTimeout(() => meteor.remove(), 2000);
      };

      setInterval(createMeteor, 4000);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/games/new", { playerName: inputName });
        console.log("Game created:", response.data);
        localStorage.setItem("playerName", response.data.playerName);
        setUsername(response.data.playerName);
        navigate(`/game/`);
      } catch (err) {
        console.error("Error creating game:", err);
      }
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem("playerName");
    setUsername("");
    setInputName("");
  };

  return (
    <div className="space-container" style={{ color: "white" }}>
      <div className="stars"></div>
      <div className="planet"></div>
      <h1 className="title">Docker Hang-Man</h1>
      {username ? (
        <div className="player-display">
          <p>Player: {username}</p>
          <button onClick={() => navigate(`/game/`)} className="start-button">
            Continue Game
          </button>
          <button onClick={handleNewGame} className="start-button">
            New Game
          </button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="username-input"
            placeholder="Enter Username"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            required
          />
          <button type="submit" className="start-button">
            Start
          </button>
        </form>
      )}
    </div>
  );
}

export default Homepage;

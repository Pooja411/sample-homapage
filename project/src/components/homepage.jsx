import React, { useState, useEffect } from 'react';

function Homepage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // For startss
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
      }
    }

    // For planettt
    const container = document.querySelector('.space-container');
    if (container) {
      const createMeteor = () => {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.top = Math.random() * 50 + '%';
        container.appendChild(meteor);
        setTimeout(() => meteor.remove(), 2000);
      };

      setInterval(createMeteor, 4000);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      console.log('Starting game with username:', username);
    }
  };

  return (
    <div className="space-container">
      <div className="stars"></div>
      <div className="planet"></div>
      <h1 className="title">Docker Hang-Man</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="username-input"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" className="start-button">
          Start
        </button>
      </form>
    </div>
  );
}

export default Homepage;

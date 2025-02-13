import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stage1 from "/image.png";
import stage2 from "/image.png";
import stage3 from "/image.png";
import stage4 from "/image.png";
import stage5 from "/image.png";
import stage6 from "/image.png";
import stage7 from "/image.png";
import "./hangman.css";

const DOCKER_QUESTIONS = [
  {
    question: "How do you list all running containers?",
    answer: "docker ps",
    hint: "Use 'ps' to show processes",
  },
  {
    question: "How do you build a Docker image from a Dockerfile?",
    answer: "docker build",
    hint: "Command to create an image",
  },
  {
    question: "How do you pull an image from Docker Hub?",
    answer: "docker pull",
    hint: "Opposite of push",
  },
  {
    question: "How do you stop a running container?",
    answer: "docker stop",
    hint: "Opposite of start",
  },
  {
    question: "How do you remove a container?",
    answer: "docker rm",
    hint: "Short for remove",
  },
  {
    question: "How do you list all Docker images?",
    answer: "docker images",
    hint: "Shows all local images",
  },
];

const HANGMAN_STAGES = [stage1, stage2, stage3, stage4, stage5, stage6, stage7];

const KEYBOARD_LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Hangman() {
  const [currentQuestion, setCurrentQuestion] = useState(DOCKER_QUESTIONS[0]);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showHint, setShowHint] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    selectNewQuestion();
  }, []);

  const selectNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * DOCKER_QUESTIONS.length);
    setCurrentQuestion(DOCKER_QUESTIONS[randomIndex]);
  };

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || !letter || !currentQuestion) return;

    letter = letter.toLowerCase();

    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters);
      newGuessedLetters.add(letter);
      setGuessedLetters(newGuessedLetters);

      if (!currentQuestion.answer.toLowerCase().includes(letter)) {
        const newWrongGuesses = wrongGuesses + 1;
        setWrongGuesses(newWrongGuesses);
        if (newWrongGuesses >= 6) {
          setGameStatus("lost");
        }
      }

      const isComplete = [...currentQuestion.answer.toLowerCase()].every(
        (char) => char === " " || newGuessedLetters.has(char)
      );
      if (isComplete) {
        setGameStatus("won");
      }
    }
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (!userInput) return;
    handleGuess(userInput);
    setUserInput("");
  };

  const resetGame = () => {
    selectNewQuestion();
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
    setShowHint(false);
    setUserInput("");
  };

  const displayWord = () => {
    if (!currentQuestion) return "";
    return currentQuestion.answer
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return guessedLetters.has(char.toLowerCase()) ? char : "_";
      })
      .join(" ");
  };

  const isLetterGuessed = (letter) => {
    return guessedLetters.has(letter);
  };

  const isLetterCorrect = (letter) => {
    if (!currentQuestion) return false;
    return currentQuestion.answer.toLowerCase().includes(letter);
  };

  return (
    <div className="game-container">
      <motion.h1
        className="game-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        data-text="DOCKER HANGMAN"
      >
        DOCKER HANGMAN
      </motion.h1>
      <motion.div
        className="game-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="game-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="hangman-image"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={HANGMAN_STAGES[wrongGuesses]}
              alt={`Hangman stage ${wrongGuesses}`}
              className="hangman-stage"
            />
          </motion.div>

          <motion.div
            className="word-display"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <code>{displayWord()}</code>
          </motion.div>
        </motion.div>

        <motion.div
          className="game-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="question-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2>Question:</h2>
            <p className="question-text">{currentQuestion?.question}</p>
            <AnimatePresence>
              {showHint && (
                <motion.p
                  className="hint-text"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  Hint: {currentQuestion?.hint}
                </motion.p>
              )}
            </AnimatePresence>
            {!showHint && gameStatus === "playing" && (
              <motion.button
                onClick={() => setShowHint(true)}
                className="hint-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Hint
              </motion.button>
            )}
          </motion.div>

          <motion.div
            className="virtual-keyboard"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="keyboard-row">
                {row.map((letter) => {
                  const isGuessed = isLetterGuessed(letter);
                  const isCorrect = isLetterCorrect(letter);
                  return (
                    <motion.button
                      key={letter}
                      onClick={() => handleGuess(letter)}
                      disabled={gameStatus !== "playing" || isGuessed}
                      className={`keyboard-key ${
                        isGuessed ? (isCorrect ? "correct" : "incorrect") : ""
                      }`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {letter}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {gameStatus !== "playing" && (
          <motion.div
            className="game-over"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2>
              {gameStatus === "won"
                ? "Congratulations! You got it right!"
                : "Game Over!"}
            </h2>
            {gameStatus === "lost" && (
              <p>
                The correct command was: <code>{currentQuestion?.answer}</code>
              </p>
            )}
            <motion.button
              onClick={resetGame}
              className="reset-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Another Question
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Hangman;

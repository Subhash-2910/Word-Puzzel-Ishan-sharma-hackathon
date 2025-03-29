import React, { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameState, Puzzle } from './types';

// Sample puzzle data
export const puzzles: Puzzle[] = [
  {
    targetWords: [
      { id: 1, text: 'APPLE' },
      { id: 2, text: 'TREE' },
      { id: 3, text: 'CORE' },
      { id: 4, text: 'PIE' },
      { id: 5, text: 'TEACHER' },
    ],
    difficulty: 'Novice',
    hints: [
      'Something edible that grows on trees',
      'Noun',
      'Starts with F',
      '5 letters',
    ],
    solution: 'FRUIT',
  },
  {
    targetWords: [
      { id: 1, text: 'SUN' },
      { id: 2, text: 'MOON' },
      { id: 3, text: 'STAR' },
      { id: 4, text: 'PLANET' },
      { id: 5, text: 'GALAXY' },
    ],
    difficulty: 'Novice',
    hints: [
      'Found in space',
      'Noun',
      'Starts with S',
      '6 letters',
    ],
    solution: 'SKY',
  },
  {
    targetWords: [
      { id: 1, text: 'PEN' },
      { id: 2, text: 'PAPER' },
      { id: 3, text: 'BOOK' },
      { id: 4, text: 'DESK' },
      { id: 5, text: 'STUDENT' },
    ],
    difficulty: 'Novice',
    hints: [
      'Found in a classroom',
      'Noun',
      'Starts with S',
      '6 letters',
    ],
    solution: 'SCHOOL',
  },
  {
    targetWords: [
      { id: 1, text: 'BREAD' },
      { id: 2, text: 'CAKE' },
      { id: 3, text: 'COOKIE' },
      { id: 4, text: 'PIE' },
      { id: 5, text: 'BAKER' },
    ],
    difficulty: 'Novice',
    hints: [
      'Made in an oven',
      'Noun',
      'Starts with B',
      '5 letters',
    ],
    solution: 'BAKED',
  },
  {
    targetWords: [
      { id: 1, text: 'LION' },
      { id: 2, text: 'TIGER' },
      { id: 3, text: 'BEAR' },
      { id: 4, text: 'WOLF' },
      { id: 5, text: 'ZOO' },
    ],
    difficulty: 'Novice',
    hints: [
      'Found in the wild',
      'Noun',
      'Starts with A',
      '6 letters',
    ],
    solution: 'ANIMAL',
  },
  {
    targetWords: [
      { id: 1, text: 'RED' },
      { id: 2, text: 'BLUE' },
      { id: 3, text: 'GREEN' },
      { id: 4, text: 'YELLOW' },
      { id: 5, text: 'PAINT' },
    ],
    difficulty: 'Novice',
    hints: [
      'Visual property',
      'Noun',
      'Starts with C',
      '5 letters',
    ],
    solution: 'COLOR',
  },
  {
    targetWords: [
      { id: 1, text: 'RUN' },
      { id: 2, text: 'JUMP' },
      { id: 3, text: 'WALK' },
      { id: 4, text: 'DANCE' },
      { id: 5, text: 'PLAYER' },
    ],
    difficulty: 'Novice',
    hints: [
      'Physical activity',
      'Noun',
      'Starts with M',
      '7 letters',
    ],
    solution: 'MOVEMENT',
  },
  {
    targetWords: [
      { id: 1, text: 'PIZZA' },
      { id: 2, text: 'BURGER' },
      { id: 3, text: 'SUSHI' },
      { id: 4, text: 'PASTA' },
      { id: 5, text: 'CHEF' },
    ],
    difficulty: 'Novice',
    hints: [
      'Something to eat',
      'Noun',
      'Starts with F',
      '4 letters',
    ],
    solution: 'FOOD',
  },
  {
    targetWords: [
      { id: 1, text: 'GAME' },
      { id: 2, text: 'PLAY' },
      { id: 3, text: 'FUN' },
      { id: 4, text: 'LAUGH' },
      { id: 5, text: 'CHILD' },
    ],
    difficulty: 'Novice',
    hints: [
      'Opposite of work',
      'Noun',
      'Starts with P',
      '6 letters',
    ],
    solution: 'PLEASE',
  },
  {
    targetWords: [
      { id: 1, text: 'WATER' },
      { id: 2, text: 'OCEAN' },
      { id: 3, text: 'RIVER' },
      { id: 4, text: 'LAKE' },
      { id: 5, text: 'FISH' },
    ],
    difficulty: 'Novice',
    hints: [
      'Found in nature',
      'Noun',
      'Starts with L',
      '6 letters',
    ],
    solution: 'LIQUID',
  }
];

// Function to get a random puzzle index
function getRandomPuzzleIndex(): number {
  return Math.floor(Math.random() * puzzles.length);
}

function createInitialGameState(puzzleIndex: number, currentTimeRemaining: number = 6): GameState {
  return {
    currentPuzzleIndex: puzzleIndex,
    currentHintIndex: 0,
    hints: puzzles[puzzleIndex].hints,
    isTimerRunning: true,
    timeRemaining: currentTimeRemaining,
    revealedAnswer: false,
    targetWords: puzzles[puzzleIndex].targetWords,
    solution: puzzles[puzzleIndex].solution,
    difficulty: puzzles[puzzleIndex].difficulty,
    hintsRemaining: 3,
    playerGuess: '',
    isCorrect: null,
    attempts: 0
  };
}

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState(getRandomPuzzleIndex()));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isWelcomeClosed, setIsWelcomeClosed] = useState(false);

  // Update high score when correctAnswers changes
  useEffect(() => {
    if (correctAnswers > highScore) {
      setHighScore(correctAnswers);
    }
  }, [correctAnswers, highScore]);

  const resetGame = () => {
    setGameState(createInitialGameState(getRandomPuzzleIndex()));
    setCorrectAnswers(0);
    setIsGameComplete(false);
    setIsWelcomeClosed(true);
  };

  useEffect(() => {
    let timer: number;
    
    if (gameState.isTimerRunning && gameState.timeRemaining > 0 && isWelcomeClosed) {
      timer = window.setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.timeRemaining === 0) {
      setGameState(prev => ({
        ...prev,
        isTimerRunning: false,
        revealedAnswer: true
      }));
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [gameState.isTimerRunning, gameState.timeRemaining, isWelcomeClosed]);

  const handleGuessSubmit = (guess: string) => {
    const isCorrect = guess.toLowerCase() === gameState.solution.toLowerCase();
    setGameState(prev => ({
      ...prev,
      playerGuess: guess,
      isCorrect,
      attempts: prev.attempts + 1
    }));

    if (isCorrect) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);

      if (newCorrectAnswers === puzzles.length) {
        setIsGameComplete(true);
        return;
      }

      // Get next puzzle index and maintain current time
      const nextIndex = getRandomPuzzleIndex();
      setGameState(createInitialGameState(nextIndex, gameState.timeRemaining));
    }
  };

  const handleHintRequest = () => {
    if (gameState.hintsRemaining > 0 && gameState.currentHintIndex < gameState.hints.length) {
      setGameState((prev) => ({
        ...prev,
        hintsRemaining: prev.hintsRemaining - 1,
        currentHintIndex: prev.currentHintIndex + 1,
      }));
    }
  };

  const handleRevealAnswer = () => {
    setGameState((prev) => ({
      ...prev,
      revealedAnswer: true,
      isTimerRunning: false
    }));
  };

  const handleWelcomeClose = () => {
    setIsWelcomeClosed(true);
    setGameState(prev => ({
      ...prev,
      isTimerRunning: true
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto py-8">
        <GameBoard
          gameState={gameState}
          onGuessSubmit={handleGuessSubmit}
          onHintRequest={handleHintRequest}
          onRevealAnswer={handleRevealAnswer}
          correctAnswers={correctAnswers}
          onPlayAgain={resetGame}
          highScore={highScore}
          isGameComplete={isGameComplete}
          onWelcomeClose={handleWelcomeClose}
        />
      </div>
    </div>
  );
}

export default App;
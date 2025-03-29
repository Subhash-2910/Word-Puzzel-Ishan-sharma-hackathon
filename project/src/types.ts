export interface Word {
  id: number;
  text: string;
}

export interface Puzzle {
  targetWords: Word[];
  difficulty: 'Novice' | 'Adept' | 'Master' | 'Wordsmith';
  hints: string[];
  solution: string;
}

export interface GameState {
  currentPuzzleIndex: number;
  targetWords: Word[];
  difficulty: 'Novice' | 'Adept' | 'Master' | 'Wordsmith';
  hintsRemaining: number;
  solution: string;
  playerGuess: string;
  isCorrect: boolean | null;
  hints: string[];
  currentHintIndex: number;
  revealedAnswer: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
  attempts: number;
}

export interface Stats {
  puzzlesCompleted: number;
  streak: number;
  averageTime: number;
  hintUsagePercentage: number;
}
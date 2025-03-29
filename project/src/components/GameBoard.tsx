import React from 'react';
import { GameState } from '../types';
import { Brain, Clock, Trophy, Zap, Eye, RefreshCw, HelpCircle, Crown, Star, Sparkles, X } from 'lucide-react';
import { Rules } from './Rules';
import { puzzles } from '../App';

interface GameBoardProps {
  gameState: GameState;
  onGuessSubmit: (guess: string) => void;
  onHintRequest: () => void;
  onRevealAnswer: () => void;
  correctAnswers: number;
  onPlayAgain: () => void;
  highScore: number;
  isGameComplete: boolean;
  onWelcomeClose: () => void;
}

export function GameBoard({ gameState, onGuessSubmit, onHintRequest, onRevealAnswer, correctAnswers, onPlayAgain, highScore, isGameComplete, onWelcomeClose }: GameBoardProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [isRulesOpen, setIsRulesOpen] = React.useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = React.useState(true);

  const handleWelcomeClose = () => {
    setShowWelcomeMessage(false);
    onWelcomeClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGuessSubmit(inputValue);
      setInputValue('');
    }
  };

  const allHintsUsed = gameState.currentHintIndex >= gameState.hints.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      {showWelcomeMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center animate-fade-in relative shadow-xl">
            <button
              onClick={handleWelcomeClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-purple-600 mb-2">Welcome to WordWeave!</h2>
            <p className="text-lg text-gray-700">
              Solve all {puzzles.length} questions to reveal a secret message!!!
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <span className="text-lg font-semibold">WordWeave</span>
          <button
            onClick={() => setIsRulesOpen(true)}
            className="ml-2 text-gray-500 hover:text-purple-600 transition-colors"
            title="Game Rules"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className={`text-lg font-mono ${gameState.timeRemaining <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
              {formatTime(gameState.timeRemaining)}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-green-800">{correctAnswers}</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
            <Crown className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Best: {highScore}</span>
          </div>
        </div>
      </div>

      <Rules isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {isGameComplete ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Star className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            CONGRATULATIONS YOU BEAT THE GAME!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            You solved all {puzzles.length} puzzles correctly!
          </p>
          <button
            onClick={onPlayAgain}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {gameState.targetWords.map((word) => (
              <div
                key={word.id}
                className="bg-white p-4 rounded-lg shadow-md text-center text-lg font-medium"
              >
                {word.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter the connecting word..."
                className="w-full p-4 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                disabled={!gameState.isTimerRunning}
                autoFocus
              />
              <button
                type="submit"
                disabled={!gameState.isTimerRunning || !inputValue.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <button
                onClick={onHintRequest}
                disabled={gameState.hintsRemaining === 0 || !gameState.isTimerRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Hint ({gameState.hintsRemaining} remaining)</span>
              </button>

              {allHintsUsed && !gameState.isCorrect && (
                <button
                  onClick={onRevealAnswer}
                  disabled={!gameState.isTimerRunning}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  <Eye className="w-5 h-5" />
                  <span>Reveal Answer</span>
                </button>
              )}
            </div>

            {gameState.currentHintIndex > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Hint: {gameState.hints[gameState.currentHintIndex - 1]}
                </p>
              </div>
            )}
          </div>

          {gameState.isCorrect !== null && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                gameState.isCorrect
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {gameState.isCorrect ? 'Correct!' : 'Try again!'}
            </div>
          )}

          {gameState.revealedAnswer && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-800">
                The answer was: <span className="font-bold">{gameState.solution}</span>
              </p>
              <button
                onClick={onPlayAgain}
                className="mt-4 flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
import React from 'react';
import { X } from 'lucide-react';

interface RulesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Rules({ isOpen, onClose }: RulesProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-purple-600 mb-4">How to Play</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Objective</h3>
            <p>Find the connecting word that links all the given words together.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Game Rules</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>You have 60 seconds to solve each puzzle</li>
              <li>You can use up to 3 hints per puzzle</li>
              <li>Each hint reveals more information about the answer</li>
              <li>You can make multiple attempts until time runs out</li>
              <li>Correct answers move you to the next puzzle</li>
              <li>Timer continues across puzzles</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Example</h3>
            <p>If given words are: APPLE, TREE, CORE, PIE, TEACHER</p>
            <p>The connecting word would be: FRUIT</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
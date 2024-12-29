import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onNewPlayer: () => void;
}

export function GameOver({ score, onRestart, onNewPlayer }: GameOverProps) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Harika!</h2>
        <p className="text-xl text-gray-600">Skorun: {score} / 10</p>
      </div>
      <div className="space-y-3">
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg w-full justify-center hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          Aynı Oyuncu ile Devam Et
        </button>
        <button
          onClick={onNewPlayer}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg w-full justify-center hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          Yeni Oyuncu
        </button>
      </div>
    </div>
  );
}
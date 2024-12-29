import React from 'react';
import { CheckCircle2, XCircle, Timer } from 'lucide-react';
import { GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
  playerName: string;
  avatarUrl: string;
}

export function ScoreBoard({ stats, playerName, avatarUrl }: ScoreBoardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={`${playerName}'in avatarı`}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full"
        />
        <div className="min-w-0">
          <p className="font-medium text-gray-800 text-sm sm:text-lg truncate">
            {playerName}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
              <span className="text-green-700 font-bold text-sm sm:text-xl">
                {stats.correctAnswers}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <XCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
              <span className="text-red-700 font-bold text-sm sm:text-xl">
                {stats.wrongAnswers}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Timer className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
              <span className="text-blue-700 font-bold text-sm sm:text-xl whitespace-nowrap">
                {stats.averageResponseTime.toFixed(1)}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
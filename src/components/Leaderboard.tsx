import React from 'react';
import { Trophy, Timer, Zap } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { avatars } from '../data/avatars';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-bold text-gray-800">En İyi 5</h2>
      </div>
      
      <div className="space-y-2">
        {entries.map((entry, index) => {
          const avatar = avatars.find(a => a.id === entry.avatarId) || avatars[0];
          const totalTime = entry.averageResponseTime * 10; // 10 soru için toplam süre
          
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                index === 0 ? 'bg-yellow-100' :
                index === 1 ? 'bg-gray-100' :
                index === 2 ? 'bg-orange-100' :
                'bg-white'
              }`}
            >
              <div className="flex-shrink-0 w-6 text-center font-bold text-gray-600">
                {index + 1}
              </div>
              <img
                src={avatar.url}
                alt={`${entry.playerName}'in avatarı`}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-grow min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {entry.playerName}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    <span>{totalTime.toFixed(1)}s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{entry.averageResponseTime.toFixed(1)}s/soru</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 font-bold text-blue-600">
                {entry.score}p
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
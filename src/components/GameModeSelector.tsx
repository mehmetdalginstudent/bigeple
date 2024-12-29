import React from 'react';
import { Hourglass, Gauge, Zap, Compass } from 'lucide-react';
import { GameMode, GameModeConfig } from '../types/game';
import { gameModes } from '../data/gameModes';

interface GameModeSelectorProps {
  selectedMode: GameMode | null;
  onSelectMode: (mode: GameMode) => void;
}

const icons = {
  [Hourglass.name]: Hourglass,
  [Gauge.name]: Gauge,
  [Zap.name]: Zap,
  [Compass.name]: Compass,
};

const modeStyles = {
  easy: {
    base: 'from-green-50 to-emerald-50',
    hover: 'hover:from-green-100 hover:to-emerald-100',
    selected: 'ring-green-500 bg-gradient-to-br from-green-100 to-emerald-100',
    icon: 'text-green-600',
    title: 'text-green-800',
  },
  medium: {
    base: 'from-blue-50 to-indigo-50',
    hover: 'hover:from-blue-100 hover:to-indigo-100',
    selected: 'ring-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100',
    icon: 'text-blue-600',
    title: 'text-blue-800',
  },
  hard: {
    base: 'from-red-50 to-rose-50',
    hover: 'hover:from-red-100 hover:to-rose-100',
    selected: 'ring-red-500 bg-gradient-to-br from-red-100 to-rose-100',
    icon: 'text-red-600',
    title: 'text-red-800',
  },
  safari: {
    base: 'from-purple-50 to-fuchsia-50',
    hover: 'hover:from-purple-100 hover:to-fuchsia-100',
    selected: 'ring-purple-500 bg-gradient-to-br from-purple-100 to-fuchsia-100',
    icon: 'text-purple-600',
    title: 'text-purple-800',
  },
};

export function GameModeSelector({ selectedMode, onSelectMode }: GameModeSelectorProps) {
  const renderModeCard = (mode: GameModeConfig) => {
    const Icon = icons[mode.icon];
    const isSelected = selectedMode === mode.id;
    const styles = modeStyles[mode.id];

    return (
      <button
        key={mode.id}
        onClick={() => onSelectMode(mode.id)}
        className={`
          group flex flex-col items-start p-4 rounded-lg transition-all duration-300
          bg-gradient-to-br ${styles.base} ${styles.hover}
          ${isSelected 
            ? `ring-2 ${styles.selected} transform scale-[1.02]` 
            : 'hover:transform hover:scale-[1.02]'
          }
          text-left relative overflow-hidden
        `}
      >
        {/* Monster Image */}
        <div className="absolute right-0 top-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img
            src={mode.monsterImage}
            alt={`${mode.title} monster`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Icon 
              className={`w-5 h-5 ${styles.icon} transition-colors duration-300`} 
            />
            <h3 className={`font-bold ${styles.title} transition-colors duration-300`}>
              {mode.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">
            {mode.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            <span>⏱ {mode.timePerQuestion}s</span>
            <span>📝 {mode.totalQuestions} Soru</span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {gameModes.map(renderModeCard)}
    </div>
  );
}
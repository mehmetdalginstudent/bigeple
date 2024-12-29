import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 relative overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-white/30"
            style={{ left: `${((i + 1) / total) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
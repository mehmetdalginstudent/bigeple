import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-letter"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 2 + 1}rem`
              }}
            >
              {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
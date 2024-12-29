import React, { useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  duration: number;
  onTimeout: () => void;
  isActive: boolean;
}

export function CountdownTimer({ duration, onTimeout, isActive }: CountdownTimerProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
      if (timeDisplayRef.current) {
        timeDisplayRef.current.textContent = duration.toString();
      }
      if (progressRef.current) {
        progressRef.current.style.transform = 'rotate(-90deg)';
        progressRef.current.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)';
      }
      return;
    }

    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current!) / 1000;
      const remaining = Math.max(0, duration - Math.floor(elapsed));
      const progress = (remaining / duration) * 100;

      if (timeDisplayRef.current) {
        timeDisplayRef.current.textContent = remaining.toString();
      }

      if (progressRef.current) {
        progressRef.current.style.clipPath = getClipPath(progress);
      }

      if (remaining <= 0) {
        onTimeout();
        return;
      }

      timerRef.current = requestAnimationFrame(animate);
    };

    timerRef.current = requestAnimationFrame(animate);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [duration, onTimeout, isActive]);

  const getClipPath = (progress: number) => {
    if (progress >= 75) {
      return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    } else if (progress >= 50) {
      return 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%)';
    } else if (progress >= 25) {
      return 'polygon(50% 50%, 50% 0%, 100% 0%)';
    } else {
      return 'polygon(50% 50%, 50% 0%)';
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-4 border-gray-200"
          style={{
            clipPath: 'circle(50% at 50% 50%)',
          }}
        />
        <div
          ref={progressRef}
          className="absolute inset-0 rounded-full border-4 border-blue-500 transition-all duration-100"
          style={{
            transform: 'rotate(-90deg)',
            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Timer className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      <span ref={timeDisplayRef} className="text-2xl font-bold text-blue-500">
        {duration}
      </span>
    </div>
  );
}
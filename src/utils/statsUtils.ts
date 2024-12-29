import { GameStats } from '../types';

interface StatsUpdateParams {
  isCorrect: boolean;
  points: number;
  responseTime: number;
}

export function createInitialGameStats(): GameStats {
  return {
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
    totalPoints: 0,
    averageResponseTime: 0,
    totalResponseTime: 0
  };
}

export function updateGameStats(
  previousStats: GameStats, 
  { isCorrect, points, responseTime }: StatsUpdateParams
): GameStats {
  const newTotalTime = previousStats.totalResponseTime + responseTime;
  const newTotalQuestions = previousStats.totalQuestions + 1;
  
  return {
    correctAnswers: previousStats.correctAnswers + (isCorrect ? 1 : 0),
    wrongAnswers: previousStats.wrongAnswers + (isCorrect ? 0 : 1),
    totalQuestions: newTotalQuestions,
    totalPoints: previousStats.totalPoints + (isCorrect ? points : 0),
    totalResponseTime: newTotalTime,
    averageResponseTime: newTotalTime / newTotalQuestions
  };
}
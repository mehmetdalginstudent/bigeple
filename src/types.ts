export interface CurrentQuestion {
  words: string[];
  correctAnswer: boolean;
  points: number;
  isBonus: boolean;
  startTime?: number;
}

export interface Player {
  name: string;
  avatarId: number;
}

export interface GameStats {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  totalPoints: number;
  averageResponseTime: number;
  totalResponseTime: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  avatarId: number;
  score: number;
  averageResponseTime: number;
  date: string;
}
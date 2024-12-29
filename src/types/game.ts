export type GameMode = 'easy' | 'medium' | 'hard' | 'safari';

export interface GameModeConfig {
  id: GameMode;
  title: string;
  description: string;
  pointsPerWord: number;
  timePerQuestion: number;
  totalQuestions: number;
  icon: string;
  monsterImage: string;
}

export interface GameSettings {
  mode: GameMode;
  timePerQuestion: number;
  totalQuestions: number;
  pointsPerWord: number;
}
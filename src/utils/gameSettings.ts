import { GameMode, GameSettings } from '../types/game';
import { gameModes } from '../data/gameModes';
import { easyWords, mediumWords, hardWords } from '../data/words';

export function getGameSettings(mode: GameMode): GameSettings {
  const modeConfig = gameModes.find(m => m.id === mode);
  
  if (!modeConfig) {
    throw new Error(`Invalid game mode: ${mode}`);
  }

  return {
    mode,
    timePerQuestion: modeConfig.timePerQuestion,
    totalQuestions: modeConfig.totalQuestions,
    pointsPerWord: modeConfig.pointsPerWord
  };
}

export function getRandomWord(mode: GameMode, currentQuestion: number, totalQuestions: number) {
  const isBonusQuestion = shouldShowBonusQuestion(currentQuestion, totalQuestions);
  
  if (isBonusQuestion) {
    return getRandomBonusWord();
  }

  return getRegularWord(mode);
}

function shouldShowBonusQuestion(currentQuestion: number, totalQuestions: number): boolean {
  // Show bonus question at 75% of the game progress
  return currentQuestion === Math.floor(totalQuestions * 0.75);
}

function getRandomBonusWord() {
  const word = hardWords[Math.floor(Math.random() * hardWords.length)];
  return {
    word,
    points: 5, // Bonus questions are worth more points
    isBonus: true
  };
}

function getRegularWord(mode: GameMode) {
  let wordPool: string[];
  let points: number;
  
  switch (mode) {
    case 'easy':
      wordPool = easyWords;
      points = 1;
      break;
    case 'medium':
      wordPool = mediumWords;
      points = 2;
      break;
    case 'hard':
      wordPool = hardWords;
      points = 3;
      break;
    case 'safari':
      // For safari mode, randomly choose difficulty
      const pools = [
        { words: easyWords, points: 1 },
        { words: mediumWords, points: 2 },
        { words: hardWords, points: 3 }
      ];
      const randomPool = pools[Math.floor(Math.random() * pools.length)];
      wordPool = randomPool.words;
      points = randomPool.points;
      break;
    default:
      wordPool = easyWords;
      points = 1;
  }

  const word = wordPool[Math.floor(Math.random() * wordPool.length)];
  return {
    word,
    points,
    isBonus: false
  };
}
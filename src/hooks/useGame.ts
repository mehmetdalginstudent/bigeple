import { useState, useCallback } from 'react';
import { CurrentQuestion, GameStats } from '../types';
import { GameMode } from '../types/game';
import { getGameSettings, getRandomWord } from '../utils/gameSettings';
import { createInitialGameStats, updateGameStats } from '../utils/statsUtils';

export function useGame(mode: GameMode) {
  const settings = getGameSettings(mode);
  const [currentQuestion, setCurrentQuestion] = useState(() => createInitialQuestion(mode, settings));
  const [gameStats, setGameStats] = useState<GameStats>(createInitialGameStats());
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = useCallback(async (answer: boolean) => {
    const endTime = Date.now();
    const responseTime = (endTime - (currentQuestion.startTime || endTime)) / 1000;
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setGameStats(prev => updateGameStats(prev, {
      isCorrect,
      points: currentQuestion.points,
      responseTime
    }));

    if (gameStats.totalQuestions + 1 >= settings.totalQuestions) {
      setGameOver(true);
      return true;
    }

    setCurrentQuestion(createNextQuestion(mode, gameStats.totalQuestions + 1, settings.totalQuestions));
    return false;
  }, [currentQuestion, gameStats.totalQuestions, mode, settings.totalQuestions]);

  const resetGame = useCallback(() => {
    setCurrentQuestion(createInitialQuestion(mode, settings));
    setGameStats(createInitialGameStats());
    setGameOver(false);
  }, [mode, settings]);

  return {
    currentQuestion,
    gameStats,
    gameOver,
    handleAnswer,
    resetGame,
    settings
  };
}

function createInitialQuestion(mode: GameMode, settings: ReturnType<typeof getGameSettings>): CurrentQuestion {
  const { word, points, isBonus } = getRandomWord(mode, 0, settings.totalQuestions);
  return {
    words: [word],
    correctAnswer: true,
    points,
    isBonus,
    startTime: Date.now()
  };
}

function createNextQuestion(mode: GameMode, currentQuestionNumber: number, totalQuestions: number): CurrentQuestion {
  const { word, points, isBonus } = getRandomWord(mode, currentQuestionNumber, totalQuestions);
  return {
    words: [word],
    correctAnswer: true,
    points,
    isBonus,
    startTime: Date.now()
  };
}
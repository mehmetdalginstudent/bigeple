import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrentQuestion, GameSettings } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { ProgressBar } from './ProgressBar';
import { FeedbackAnimation } from './FeedbackAnimation';
import { WordDisplay } from './WordDisplay';
import { AnswerButtons } from './AnswerButtons';
import { GameOver } from './GameOver';

interface GameCardProps {
  gameOver: boolean;
  score: number;
  questionCount: number;
  currentQuestion: CurrentQuestion;
  settings: GameSettings;
  onAnswer: (isCorrect: boolean) => void;
  onRestart: () => void;
  onNewPlayer: () => void;
}

const cardVariants = {
  initial: { 
    scale: 0.8,
    opacity: 0,
    y: 50
  },
  animate: { 
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.3
    }
  },
  exit: { 
    scale: 0.8,
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3
    }
  }
};

export function GameCard({ 
  gameOver, 
  score, 
  questionCount, 
  currentQuestion, 
  settings,
  onAnswer, 
  onRestart,
  onNewPlayer 
}: GameCardProps) {
  const [timerKey, setTimerKey] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(answer);
      setTimerKey(prev => prev + 1);
    }, 1000);
  };

  const handleTimeout = () => {
    setLastAnswerCorrect(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(false);
      setTimerKey(prev => prev + 1);
    }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gameOver ? 'gameover' : 'gameplay'}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto"
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Kelime Okuma</h1>
          <motion.p 
            className="text-gray-600 mb-4 sm:mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          >
            Puan: {score} ({questionCount}/{settings.totalQuestions})
          </motion.p>
        </motion.div>

        {!gameOver ? (
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <ProgressBar current={questionCount} total={settings.totalQuestions} />
            <WordDisplay 
              word={currentQuestion.words[0]} 
              isBonus={currentQuestion.isBonus}
              points={currentQuestion.points}
            />
            <CountdownTimer
              key={timerKey}
              duration={settings.timePerQuestion}
              onTimeout={handleTimeout}
              isActive={!gameOver && !showFeedback}
            />
            <AnswerButtons
              onAnswer={handleAnswer}
              disabled={showFeedback}
            />
          </div>
        ) : (
          <GameOver
            score={score}
            onRestart={onRestart}
            onNewPlayer={onNewPlayer}
          />
        )}
        
        <FeedbackAnimation
          isVisible={showFeedback}
          isCorrect={lastAnswerCorrect}
        />
      </motion.div>
    </AnimatePresence>
  );
}
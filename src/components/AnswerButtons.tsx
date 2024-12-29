import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface AnswerButtonsProps {
  onAnswer: (answer: boolean) => void;
  disabled: boolean;
}

const buttonVariants = {
  initial: { 
    scale: 0.8,
    opacity: 0,
    y: 20
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
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  },
  disabled: {
    opacity: 0.5,
    scale: 0.95
  }
};

export function AnswerButtons({ onAnswer, disabled }: AnswerButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate={disabled ? "disabled" : "animate"}
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        onClick={() => onAnswer(true)}
        disabled={disabled}
        className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-2"
      >
        <Check className="w-6 h-6" />
        Evet
      </motion.button>
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate={disabled ? "disabled" : "animate"}
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        onClick={() => onAnswer(false)}
        disabled={disabled}
        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-2"
      >
        <X className="w-6 h-6" />
        Hayır
      </motion.button>
    </div>
  );
}
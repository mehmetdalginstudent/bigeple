import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface FeedbackAnimationProps {
  isVisible: boolean;
  isCorrect: boolean;
}

const feedbackVariants = {
  initial: { 
    scale: 0.5,
    opacity: 0
  },
  animate: { 
    scale: [0.5, 1.2, 1],
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      times: [0, 0.5, 1],
      ease: "easeInOut"
    }
  }
};

export function FeedbackAnimation({ isVisible, isCorrect }: FeedbackAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial="initial"
          animate="animate"
          exit="initial"
          variants={feedbackVariants}
        >
          <div className={`
            ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
            rounded-full p-8
          `}>
            {isCorrect ? (
              <Check className="w-16 h-16 text-white" />
            ) : (
              <X className="w-16 h-16 text-white" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
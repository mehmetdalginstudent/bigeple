import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface WordDisplayProps {
  word: string;
  isBonus?: boolean;
  points: number;
}

const wordVariants = {
  initial: { 
    scale: 0.5,
    opacity: 0,
    y: 20
  },
  animate: { 
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.4
    }
  }
};

const bonusVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function WordDisplay({ word, isBonus = false, points }: WordDisplayProps) {
  return (
    <motion.div 
      className="bg-blue-50/80 backdrop-blur rounded-lg p-4 sm:p-6 md:p-8"
      initial="initial"
      animate="animate"
      variants={wordVariants}
    >
      <div className="text-center space-y-3 sm:space-y-4">
        {isBonus && (
          <motion.div 
            className="flex items-center justify-center gap-2 text-yellow-500"
            variants={bonusVariants}
            animate="animate"
          >
            <Star className="w-6 h-6 fill-current" />
            <span className="font-bold">Bonus Kelime! (+{points} Puan)</span>
            <Star className="w-6 h-6 fill-current" />
          </motion.div>
        )}
        <motion.p 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {word}
        </motion.p>
        <motion.p 
          className="text-base sm:text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Bu kelimeyi doğru okuyabilir misin?
        </motion.p>
        {!isBonus && (
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Doğru cevap: +{points} puan
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const letterVariants = {
  hidden: { 
    y: 20,
    opacity: 0,
    scale: 0.5
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.3
    }
  }
};

export function AnimatedTitle() {
  const letters = "Kelime BİGEP'LE".split('');
  
  return (
    <motion.h1 
      className="flex justify-center items-center flex-wrap gap-1 text-4xl font-bold mb-8 select-none"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          whileHover="hover"
          className={`
            inline-block px-1 text-white
            ${letter !== ' ' ? 'cursor-default' : ''}
          `}
          style={{
            textShadow: letter !== ' ' ? '2px 2px 4px rgba(0,0,0,0.2)' : 'none'
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
import { CurrentQuestion } from '../types';
import { words } from './words';

export function getRandomQuestion(): CurrentQuestion {
  const word = words[Math.floor(Math.random() * words.length)];
  
  return {
    letter: word[0],
    words: [word], // Always show the correct word
    correctAnswer: true // Always true since we only show correct words
  };
}
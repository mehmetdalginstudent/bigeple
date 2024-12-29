import { GameModeConfig } from '../types/game';
import { Hourglass, Gauge, Zap, Compass } from 'lucide-react';

export const gameModes: GameModeConfig[] = [
  {
    id: 'easy',
    title: 'Kolay Mod',
    description: 'Basit kelimeler ile başlayın. Her doğru cevap 1 puan.',
    pointsPerWord: 1,
    timePerQuestion: 12,
    totalQuestions: 10,
    icon: Hourglass.name,
    monsterImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=happy&backgroundColor=b6e3f4'
  },
  {
    id: 'medium',
    title: 'Orta Seviye',
    description: 'Biraz daha zorlayıcı kelimeler. Her doğru cevap 2 puan.',
    pointsPerWord: 2,
    timePerQuestion: 10,
    totalQuestions: 10,
    icon: Gauge.name,
    monsterImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=warrior&backgroundColor=ffdfbf'
  },
  {
    id: 'hard',
    title: 'Zor Mod',
    description: 'En zorlu kelimeler ile kendinizi test edin. Her doğru cevap 3 puan.',
    pointsPerWord: 3,
    timePerQuestion: 9,
    totalQuestions: 10,
    icon: Zap.name,
    monsterImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=dragon&backgroundColor=ffd5dc'
  },
  {
    id: 'safari',
    title: 'Safari Modu',
    description: 'Karışık zorlukta 15 soru. Kolay: 1 puan, Orta: 2 puan, Zor: 3 puan.',
    pointsPerWord: 0,
    timePerQuestion: 10,
    totalQuestions: 15,
    icon: Compass.name,
    monsterImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=explorer&backgroundColor=baffc9'
  }
];
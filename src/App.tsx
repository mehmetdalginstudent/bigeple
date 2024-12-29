import React, { useState } from 'react';
import { GameCard } from './components/GameCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PlayerSetup } from './components/PlayerSetup';
import { ScoreBoard } from './components/ScoreBoard';
import { Leaderboard } from './components/Leaderboard';
import { AnimatedTitle } from './components/AnimatedTitle';
import { Player } from './types';
import { GameMode } from './types/game';
import { avatars } from './data/avatars';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useGame } from './hooks/useGame';

interface GameState {
  player: Player;
  mode: GameMode;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const { entries: leaderboard, loading: leaderboardLoading, addEntry } = useLeaderboard();
  const { currentQuestion, gameStats, gameOver, handleAnswer, resetGame, settings } = useGame(
    gameState?.mode || 'easy'
  );

  const handlePlayerSetup = (player: Player, mode: GameMode) => {
    setGameState({ player, mode });
  };

  const handlePlayerAnswer = async (answer: boolean) => {
    const isGameOver = await handleAnswer(answer);
    if (isGameOver && gameState) {
      await addEntry({
        playerName: gameState.player.name,
        avatarId: gameState.player.avatarId,
        score: gameStats.totalPoints,
        averageResponseTime: gameStats.averageResponseTime
      });
    }
  };

  const handleNewPlayer = () => {
    setGameState(null);
    resetGame();
  };

  const avatarUrl = gameState?.player 
    ? (avatars.find(a => a.id === gameState.player.avatarId)?.url || avatars[0].url) 
    : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center mb-8">
          <AnimatedTitle />
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 relative">
          {/* Sol Kenar - Liderlik Tablosu */}
          {gameState && !leaderboardLoading && (
            <div className="hidden lg:block w-80 sticky top-4">
              <Leaderboard entries={leaderboard.slice(0, 5)} />
            </div>
          )}

          {/* Orta - Ana Oyun Alanı */}
          <div className="w-full max-w-2xl mx-auto">
            {!gameState ? (
              <PlayerSetup onComplete={handlePlayerSetup} />
            ) : (
              <div className="space-y-6">
                {/* Skor Tablosu - Mobil */}
                <div className="lg:hidden">
                  <ScoreBoard
                    stats={gameStats}
                    playerName={gameState.player.name}
                    avatarUrl={avatarUrl}
                  />
                </div>

                <GameCard
                  gameOver={gameOver}
                  score={gameStats.totalPoints}
                  questionCount={gameStats.totalQuestions}
                  currentQuestion={currentQuestion}
                  onAnswer={handlePlayerAnswer}
                  onRestart={resetGame}
                  onNewPlayer={handleNewPlayer}
                  settings={settings}
                />
              </div>
            )}

            {/* Mobil Liderlik Tablosu */}
            {gameState && gameOver && !leaderboardLoading && (
              <div className="mt-6 lg:hidden">
                <Leaderboard entries={leaderboard.slice(0, 5)} />
              </div>
            )}
          </div>

          {/* Sağ Kenar - Skor Tablosu */}
          {gameState && (
            <div className="hidden lg:block w-80 sticky top-4">
              <ScoreBoard
                stats={gameStats}
                playerName={gameState.player.name}
                avatarUrl={avatarUrl}
              />
            </div>
          )}
        </div>

        <footer className="text-center text-white mt-8 text-sm">
          © Şanlıurfa İl Milli Eğitim Müdürlüğü 2024 BİGEP Projesi
        </footer>
      </div>
    </div>
  );
}
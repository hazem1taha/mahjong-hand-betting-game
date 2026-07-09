import { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext.jsx';
import { LandingPage } from './views/LandingPage.jsx';
import { GameScreen } from './views/GameScreen.jsx';
import { GameOverScreen } from './views/GameOverScreen.jsx';
import { GAME_STATUS } from './engine/gameEngine.js';
import './styles/index.css';

function AppContent() {
  const { game, newGame } = useGame();
  const [view, setView] = useState('landing');

  function handleNewGame() {
    newGame();
    setView('game');
  }

  function handleExit() {
    setView('landing');
  }

  function handleReturnHome() {
    setView('landing');
  }

  const isGameOver = game.status === GAME_STATUS.GAME_OVER;

  if (view === 'landing') {
    return <LandingPage onNewGame={handleNewGame} />;
  }

  if (isGameOver) {
    return (
      <GameOverScreen
        onPlayAgain={() => setView('game')}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return <GameScreen onExit={handleExit} />;
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

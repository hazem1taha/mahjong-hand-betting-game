import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { GAME_STATUS, GAME_OVER_REASON } from '../engine/gameEngine.js';
import { saveScore, isHighScore } from '../engine/leaderboard.js';

const REASON_MESSAGES = {
  [GAME_OVER_REASON.TILE_VALUE_MIN]: 'A tile reached value 0 — it burned out.',
  [GAME_OVER_REASON.TILE_VALUE_MAX]: 'A tile reached value 10 — it maxed out.',
  [GAME_OVER_REASON.RESHUFFLE_LIMIT]: 'The deck was reshuffled 3 times. Game over.',
};

export function GameOverScreen({ onPlayAgain, onReturnHome }) {
  const { game, newGame } = useGame();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  if (game.status !== GAME_STATUS.GAME_OVER) return null;

  const highScore = isHighScore(game.score);

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    saveScore(name.trim(), game.score);
    setSaved(true);
  }

  function handlePlayAgain() {
    newGame();
    onPlayAgain?.();
  }

  return (
    <div className="game-over-screen">
      <div className="game-over-card">
        <div className="game-over-card__icon">🀄</div>
        <h2 className="game-over-card__title">Game Over</h2>

        {game.gameOverReason && (
          <p className="game-over-card__reason">{REASON_MESSAGES[game.gameOverReason]}</p>
        )}

        <div className="game-over-card__score">
          <span className="game-over-card__score-label">Final Score</span>
          <span className="game-over-card__score-value">{game.score.toLocaleString()}</span>
        </div>

        {game.history.length > 0 && (
          <div className="game-over-card__stats">
            <div className="stat">
              <span className="stat__value">{game.history.length}</span>
              <span className="stat__label">Hands Played</span>
            </div>
            <div className="stat">
              <span className="stat__value">{game.history.filter((h) => h.won).length}</span>
              <span className="stat__label">Wins</span>
            </div>
            <div className="stat">
              <span className="stat__value">
                {Math.round((game.history.filter((h) => h.won).length / game.history.length) * 100)}%
              </span>
              <span className="stat__label">Win Rate</span>
            </div>
          </div>
        )}

        {highScore && !saved && (
          <div className="high-score-entry">
            <p className="high-score-entry__label">🏆 New High Score! Enter your name:</p>
            <form className="high-score-entry__form" onSubmit={handleSave}>
              <input
                className="high-score-entry__input"
                type="text"
                maxLength={20}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <button className="btn btn--primary" type="submit" disabled={!name.trim()}>
                Save
              </button>
            </form>
          </div>
        )}

        {saved && <p className="high-score-entry__saved">Score saved! ✓</p>}

        <div className="game-over-card__actions">
          <button className="btn btn--primary" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="btn btn--ghost" onClick={onReturnHome}>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

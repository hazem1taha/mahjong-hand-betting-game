import { getLeaderboard } from '../engine/leaderboard.js';
import { useGame } from '../context/GameContext.jsx';

export function LandingPage({ onNewGame }) {
  const { newGame } = useGame();
  const leaderboard = getLeaderboard();

  function handleNewGame() {
    newGame();
    onNewGame?.();
  }

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__tiles-deco" aria-hidden="true">
          <span className="deco-tile">中</span>
          <span className="deco-tile">發</span>
          <span className="deco-tile">東</span>
          <span className="deco-tile">白</span>
        </div>
        <h1 className="landing__title">Penny Mahjong</h1>
        <p className="landing__subtitle">Hand Betting Game</p>
        <button className="btn btn--primary btn--large" onClick={handleNewGame}>
          New Game
        </button>
      </div>

      <div className="landing__leaderboard">
        <h2 className="section-title">Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="leaderboard__empty">No scores yet. Be the first!</p>
        ) : (
          <ol className="leaderboard">
            {leaderboard.map((entry, i) => (
              <li key={i} className={`leaderboard__entry ${i === 0 ? 'leaderboard__entry--first' : ''}`}>
                <span className="leaderboard__rank">#{i + 1}</span>
                <span className="leaderboard__name">{entry.name}</span>
                <span className="leaderboard__score">{entry.score.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

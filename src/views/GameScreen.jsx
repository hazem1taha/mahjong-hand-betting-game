import { useGame } from '../context/GameContext.jsx';
import { GAME_STATUS } from '../engine/gameEngine.js';
import { HandDisplay, HandHistory } from '../components/HandDisplay.jsx';
import { BettingControls } from '../components/BettingControls.jsx';
import { DeckInfo } from '../components/DeckInfo.jsx';
import { TileValueRadar } from '../components/TileValueRadar.jsx';

export function GameScreen({ onExit }) {
  const { game, bet } = useGame();

  if (game.status !== GAME_STATUS.PLAYING) return null;

  return (
    <div className="game-screen">
      <header className="game-header">
        <button className="btn btn--ghost btn--small" onClick={onExit}>
          ← Exit
        </button>
        <div className="game-header__score">
          Score: <strong>{game.score.toLocaleString()}</strong>
        </div>
        <DeckInfo
          drawPile={game.drawPile}
          discardPile={game.discardPile}
          reshuffleCount={game.reshuffleCount}
        />
      </header>

      <div className="game-body">
        <main className="game-main">
          <section className="current-hand">
            <HandDisplay tiles={game.currentHand} label="Current Hand" />
          </section>

          <BettingControls onBet={bet} />

          {game.history.length > 0 && (
            <section className="history-section">
              <h3 className="section-title">History</h3>
              <div className="history-list">
                {game.history.map((entry, i) => (
                  <HandHistory key={i} entry={entry} index={i} />
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="game-sidebar">
          <TileValueRadar />
        </aside>
      </div>
    </div>
  );
}

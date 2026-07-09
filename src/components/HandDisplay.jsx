import { Tile } from './Tile.jsx';
import { handTotal } from '../engine/tiles.js';

export function HandDisplay({ tiles, label }) {
  const total = handTotal(tiles);
  return (
    <div className="hand-display">
      {label && <div className="hand-display__label">{label}</div>}
      <div className="hand-display__tiles">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>
      <div className="hand-display__total">
        Total: <strong>{total}</strong>
      </div>
    </div>
  );
}

export function HandHistory({ entry, index }) {
  const total = handTotal(entry.hand);
  return (
    <div className={`hand-history ${entry.won ? 'hand-history--won' : 'hand-history--lost'}`}>
      <div className="hand-history__meta">
        <span className="hand-history__index">#{index + 1}</span>
        <span className="hand-history__bet">Bet {entry.bet}</span>
        <span className={`hand-history__result ${entry.won ? 'result--won' : 'result--lost'}`}>
          {entry.won ? 'WIN' : 'LOSS'}
        </span>
        <span className="hand-history__total">{total} pts</span>
      </div>
      <div className="hand-history__tiles">
        {entry.hand.map((tile) => (
          <Tile key={tile.id} tile={tile} small />
        ))}
      </div>
    </div>
  );
}

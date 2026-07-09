import { RESHUFFLE_LIMIT } from '../engine/tiles.js';

export function DeckInfo({ drawPile, discardPile, reshuffleCount }) {
  return (
    <div className="deck-info">
      <div className="deck-info__item">
        <span className="deck-info__icon">🀫</span>
        <span className="deck-info__count">{drawPile.length}</span>
        <span className="deck-info__label">Draw Pile</span>
      </div>
      <div className="deck-info__divider" />
      <div className="deck-info__item">
        <span className="deck-info__icon">🗑️</span>
        <span className="deck-info__count">{discardPile.length}</span>
        <span className="deck-info__label">Discard Pile</span>
      </div>
      <div className="deck-info__divider" />
      <div className="deck-info__item">
        <span className="deck-info__icon">🔀</span>
        <span className={`deck-info__count ${reshuffleCount >= RESHUFFLE_LIMIT - 1 ? 'deck-info__count--warning' : ''}`}>
          {reshuffleCount}/{RESHUFFLE_LIMIT}
        </span>
        <span className="deck-info__label">Reshuffles</span>
      </div>
    </div>
  );
}

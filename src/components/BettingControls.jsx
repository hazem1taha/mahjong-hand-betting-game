import { BET } from '../engine/gameEngine.js';

export function BettingControls({ onBet, disabled }) {
  return (
    <div className="betting-controls">
      <p className="betting-controls__prompt">Will the next hand be higher or lower?</p>
      <div className="betting-controls__buttons">
        <button
          className="btn btn--higher"
          onClick={() => onBet(BET.HIGHER)}
          disabled={disabled}
        >
          <span className="btn__icon">▲</span>
          Bet Higher
        </button>
        <button
          className="btn btn--lower"
          onClick={() => onBet(BET.LOWER)}
          disabled={disabled}
        >
          <span className="btn__icon">▼</span>
          Bet Lower
        </button>
      </div>
    </div>
  );
}

import { createContext, useContext, useReducer, useCallback } from 'react';
import { initGameState, placeBet, GAME_STATUS } from '../engine/gameEngine.js';

const GameContext = createContext(null);

const ACTION = {
  NEW_GAME: 'NEW_GAME',
  PLACE_BET: 'PLACE_BET',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return initGameState();
    case ACTION.PLACE_BET:
      return placeBet(state, action.bet);
    default:
      return state;
  }
}

const INITIAL = { status: GAME_STATUS.IDLE };

export function GameProvider({ children }) {
  const [game, dispatch] = useReducer(reducer, INITIAL);

  const newGame = useCallback(() => dispatch({ type: ACTION.NEW_GAME }), []);
  const bet = useCallback((direction) => dispatch({ type: ACTION.PLACE_BET, bet: direction }), []);

  return <GameContext.Provider value={{ game, newGame, bet }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside GameProvider');
  return ctx;
}

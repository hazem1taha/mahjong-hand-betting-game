import {
  createDeck,
  shuffle,
  handTotal,
  hydrateValues,
  initTileValues,
  TILE_TYPES,
  HAND_SIZE,
  RESHUFFLE_LIMIT,
  VALUE_MIN,
  VALUE_MAX,
} from './tiles.js';

export const BET = { HIGHER: 'higher', LOWER: 'lower' };

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  GAME_OVER: 'game_over',
};

export const GAME_OVER_REASON = {
  TILE_VALUE_MIN: 'tile_value_min',
  TILE_VALUE_MAX: 'tile_value_max',
  RESHUFFLE_LIMIT: 'reshuffle_limit',
};

// ── Pure helpers ──────────────────────────────────────────────────────────────

export function initGameState() {
  const tileValues = initTileValues();
  const deck = shuffle(createDeck(tileValues));
  const drawPile = [...deck];
  const hand = drawPile.splice(0, HAND_SIZE);
  return {
    status: GAME_STATUS.PLAYING,
    tileValues,
    drawPile,
    discardPile: [],
    currentHand: hand,
    score: 0,
    reshuffleCount: 0,
    gameOverReason: null,
    history: [],
  };
}

// Returns updated tileValues after applying win/loss scaling to non-number tiles in hand
function scaleTileValues(tileValues, hand, won) {
  const next = { ...tileValues };
  const delta = won ? 1 : -1;
  for (const tile of hand) {
    if (tile.type !== TILE_TYPES.NUMBER) {
      next[tile.name] = (next[tile.name] ?? 5) + delta;
    }
  }
  return next;
}

// Check global registry — game over if any non-number tile hits 0 or 10
function checkTileValuesGameOver(tileValues) {
  for (const [, value] of Object.entries(tileValues)) {
    if (value <= VALUE_MIN) return GAME_OVER_REASON.TILE_VALUE_MIN;
    if (value >= VALUE_MAX) return GAME_OVER_REASON.TILE_VALUE_MAX;
  }
  return null;
}

function drawHand(drawPile, discardPile, reshuffleCount, tileValues) {
  let pile = [...drawPile];
  let discard = [...discardPile];
  let count = reshuffleCount;
  let reshuffled = false;

  if (pile.length < HAND_SIZE) {
    count += 1;
    // Fresh deck respects current tile values so scaling persists through reshuffles
    const fresh = createDeck(tileValues);
    pile = shuffle([...fresh, ...discard]);
    discard = [];
    reshuffled = true;
  }

  const hand = pile.splice(0, HAND_SIZE);
  // Rehydrate to ensure stale pile tiles reflect latest global values
  const hydratedHand = hydrateValues(hand, tileValues);
  return { hand: hydratedHand, drawPile: pile, discardPile: discard, reshuffleCount: count, reshuffled };
}

// ── Reducer action ─────────────────────────────────────────────────────────────

export function placeBet(state, bet) {
  if (state.status !== GAME_STATUS.PLAYING) return state;

  const currentTotal = handTotal(state.currentHand);

  const {
    hand: nextHand,
    drawPile,
    discardPile,
    reshuffleCount,
    reshuffled,
  } = drawHand(state.drawPile, state.discardPile, state.reshuffleCount, state.tileValues);

  const nextTotal = handTotal(nextHand);

  const won =
    (bet === BET.HIGHER && nextTotal > currentTotal) ||
    (bet === BET.LOWER && nextTotal < currentTotal);

  // Update global tile values based on result — this is the accumulating state
  const newTileValues = scaleTileValues(state.tileValues, nextHand, won);

  // Apply updated global values to the hand tiles for display
  const scaledNextHand = nextHand.map((tile) => {
    if (tile.type === TILE_TYPES.NUMBER) return tile;
    return { ...tile, value: newTileValues[tile.name] };
  });

  const scoreChange = won ? currentTotal : 0;

  const historyEntry = {
    hand: state.currentHand,
    total: currentTotal,
    bet,
    won,
  };

  const tileGameOver = checkTileValuesGameOver(newTileValues);
  const reshuffleGameOver =
    reshuffled && reshuffleCount >= RESHUFFLE_LIMIT
      ? GAME_OVER_REASON.RESHUFFLE_LIMIT
      : null;

  const gameOverReason = tileGameOver || reshuffleGameOver;

  return {
    ...state,
    tileValues: newTileValues,
    drawPile,
    discardPile: [...discardPile, ...state.currentHand],
    currentHand: scaledNextHand,
    score: state.score + scoreChange,
    reshuffleCount,
    status: gameOverReason ? GAME_STATUS.GAME_OVER : GAME_STATUS.PLAYING,
    gameOverReason,
    history: [historyEntry, ...state.history].slice(0, 20),
  };
}

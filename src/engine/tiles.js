export const TILE_TYPES = {
  NUMBER: 'number',
  DRAGON: 'dragon',
  WIND: 'wind',
};

export const SUITS = {
  BAMBOO: 'bamboo',
  CIRCLES: 'circles',
  CHARACTERS: 'characters',
};

export const DRAGONS = ['Red Dragon', 'Green Dragon', 'White Dragon'];
export const WINDS = ['East Wind', 'South Wind', 'West Wind', 'North Wind'];
export const NON_NUMBER_TILES = [...DRAGONS, ...WINDS];

export const DRAGON_SYMBOLS = { 'Red Dragon': '中', 'Green Dragon': '發', 'White Dragon': '白' };
export const WIND_SYMBOLS = { 'East Wind': '東', 'South Wind': '南', 'West Wind': '西', 'North Wind': '北' };

let tileIdCounter = 0;

function makeTile(type, name, value, suit = null, number = null) {
  return { id: `tile-${++tileIdCounter}`, type, name, suit, number, value };
}

// Initialize global value registry for non-number tiles
export function initTileValues() {
  return Object.fromEntries(NON_NUMBER_TILES.map((name) => [name, 5]));
}

// Create deck using current global tile values so reshuffled decks reflect accumulated scaling
export function createDeck(tileValues = null) {
  const tiles = [];

  for (const suit of Object.values(SUITS)) {
    for (let n = 1; n <= 9; n++) {
      for (let copy = 0; copy < 4; copy++) {
        tiles.push(makeTile(TILE_TYPES.NUMBER, `${n} ${suit}`, n, suit, n));
      }
    }
  }

  for (const dragon of DRAGONS) {
    const val = tileValues ? tileValues[dragon] : 5;
    for (let copy = 0; copy < 4; copy++) {
      tiles.push(makeTile(TILE_TYPES.DRAGON, dragon, val));
    }
  }

  for (const wind of WINDS) {
    const val = tileValues ? tileValues[wind] : 5;
    for (let copy = 0; copy < 4; copy++) {
      tiles.push(makeTile(TILE_TYPES.WIND, wind, val));
    }
  }

  return tiles;
}

// Rehydrate tile values from global registry (for tiles already in the pile)
export function hydrateValues(tiles, tileValues) {
  return tiles.map((tile) => {
    if (tile.type === TILE_TYPES.NUMBER) return tile;
    return { ...tile, value: tileValues[tile.name] ?? 5 };
  });
}

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getTileSymbol(tile) {
  if (tile.type === TILE_TYPES.NUMBER) return String(tile.number);
  if (tile.type === TILE_TYPES.DRAGON) return DRAGON_SYMBOLS[tile.name] || '?';
  if (tile.type === TILE_TYPES.WIND) return WIND_SYMBOLS[tile.name] || '?';
  return '?';
}

export function getTileColor(tile) {
  if (tile.type === TILE_TYPES.NUMBER) {
    if (tile.suit === SUITS.BAMBOO) return 'bamboo';
    if (tile.suit === SUITS.CIRCLES) return 'circles';
    if (tile.suit === SUITS.CHARACTERS) return 'characters';
  }
  if (tile.type === TILE_TYPES.DRAGON) {
    if (tile.name === 'Red Dragon') return 'dragon-red';
    if (tile.name === 'Green Dragon') return 'dragon-green';
    if (tile.name === 'White Dragon') return 'dragon-white';
  }
  if (tile.type === TILE_TYPES.WIND) return 'wind';
  return 'default';
}

export function handTotal(tiles) {
  return tiles.reduce((sum, t) => sum + t.value, 0);
}

export const HAND_SIZE = 4;
export const RESHUFFLE_LIMIT = 3;
export const VALUE_MIN = 0;
export const VALUE_MAX = 10;

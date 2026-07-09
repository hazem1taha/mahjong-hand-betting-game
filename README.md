# Penny Mahjong — Hand Betting Game

A web-based Hand Betting Game using Mahjong tiles. Built for a technical assessment evaluating state management architecture, UI polish, and code scalability.

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## How to Play

1. **Land** on the home screen and press **New Game**.
2. Your current hand of 4 tiles is displayed with its total value.
3. Predict whether the **next hand's total will be higher or lower** than the current one.
4. If you guess correctly, you score points equal to the current hand's total.
5. The game ends when:
   - Any tile's value hits **0** or **10** (dynamic scaling for non-number tiles).
   - The deck is **reshuffled 3 times**.
6. On game over, submit your name to the **leaderboard** (top 5 stored locally).

## Architecture

```
src/
├── engine/
│   ├── tiles.js          # Tile creation, deck, shuffling, pure helpers
│   ├── gameEngine.js     # Pure state transitions (initGameState, placeBet)
│   └── leaderboard.js    # localStorage-backed leaderboard
├── context/
│   └── GameContext.jsx   # useReducer + Context — single source of truth
├── components/
│   ├── Tile.jsx          # Individual tile renderer
│   ├── HandDisplay.jsx   # Current hand + history entry
│   ├── BettingControls.jsx
│   └── DeckInfo.jsx      # Draw/Discard/Reshuffle counts
├── views/
│   ├── LandingPage.jsx
│   ├── GameScreen.jsx
│   └── GameOverScreen.jsx
└── styles/
    └── index.css         # Design tokens + all component styles
```

**Key design decisions for extensibility:**
- `gameEngine.js` is pure functions — no React, no side effects. New game rules = new functions added there.
- `useReducer` + named `ACTION` constants make it trivial to add new game actions.
- `TILE_TYPES`, `SUITS`, constants are exported from `tiles.js` — easy to add tile variants.
- CSS uses design tokens (`--color-*`, `--radius-*`) — theme changes are one-line edits.

## AI Utilization

**Handwritten:**
- Game logic architecture (`gameEngine.js`, `leaderboard.js`) — state machine design, edge cases for reshuffle/game-over triggers
- Component API design (prop interfaces, context shape)
- CSS design system (color tokens, animations, responsive breakpoints)

**AI-assisted (Claude Code):**
- Boilerplate scaffolding and file structure setup
- CSS property lookups and cross-browser compatibility checks
- Iterative bug fixing during implementation

## Tech Stack

- **React 18** + Vite
- Vanilla CSS (no UI library — demonstrates CSS capability directly)
- `localStorage` for leaderboard persistence
- Zero runtime dependencies beyond React

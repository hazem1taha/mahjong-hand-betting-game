# Technical Assessment: Hand Betting Game

## Overview

Build a web-based "Hand Betting Game" using Mahjong tiles. Evaluates complex state management, UI polish, and code scalability.

> **Note:** Build with the future in mind. During the onsite interview, new features or logic extensions will be required. Code readiness for extension is a primary evaluation factor.

---

## Core Requirements & Acceptance Criteria

### 1. Landing Page

- **New Game** — clear entry point to start a session
- **Leaderboard** — display top 5 high scores

### 2. Game Mechanics & Logic

#### Tile Set
Use Mahjong tiles: Dragons, Winds, and Number tiles.

#### Tile Values
| Tile Type | Value |
|-----------|-------|
| Number Tiles | Face value of the tile |
| Non-Number Tiles (Dragons/Winds) | Base value of 5 |

#### Dynamic Scaling (Non-Number Tiles)
- Part of **winning hand** → value increases by 1
- Part of **losing hand** → value decreases by 1
- Changes are **per tile** (not global)

#### Deck Management
- Display count of tiles remaining in **Draw Pile** and **Discard Pile**
- **Reshuffling:** When Draw Pile is empty, add a fresh deck, combine with Discard Pile, shuffle into new Draw Pile

#### Game Over Conditions
- Any single tile value reaches **0** or **10**
- Draw Pile runs out of tiles for the **3rd time**

### 3. Gameplay Interface

- **Navigation** — button to exit game and return to landing page
- **Betting** — two primary actions: `Bet Higher` / `Bet Lower` for the next hand
- **Visual State:**
  - Current hand's total value
  - Visual representations of the tiles
  - **History view** — smaller versions of the previous hand's tiles and values
- **Score Summary** — end-of-game screen displaying final score

---

## Evaluation Criteria

| Criteria | Notes |
|----------|-------|
| **Polish** | Major factor. High-quality CSS, smooth transitions, intuitive UX |
| **Scalability** | Architecture must be feature-ready for onsite extensions |
| **Code Quality** | Clean, modular, well-documented |

---

## Submission Instructions

1. **Repository** — public GitHub repository link
2. **Documentation** — `README.md` with:
   - Setup instructions
   - Note on what was handwritten vs. where AI was utilized
3. **Video Walkthrough** — short video demonstrating gameplay and technical approach
4. **Timeline** — submit within **4 days**

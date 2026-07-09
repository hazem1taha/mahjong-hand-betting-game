import { useGame } from '../context/GameContext.jsx';
import { GAME_STATUS } from '../engine/gameEngine.js';

const TILE_SYMBOLS = {
  'Red Dragon':   '中',
  'Green Dragon': '發',
  'White Dragon': '白',
  'East Wind':    '東',
  'South Wind':   '南',
  'West Wind':    '西',
  'North Wind':   '北',
  
};

const ALL_TYPES = Object.keys(TILE_SYMBOLS);

function getBarColor(value) {
  if (value <= 1 || value >= 9) return '#e05c5c';
  if (value <= 2 || value >= 8) return '#f4845f';
  if (value <= 3 || value >= 7) return '#e8b86d';
  return '#4caf7d';
}

export function TileValueRadar() {
  const { game } = useGame();

  if (game.status !== GAME_STATUS.PLAYING) return null;

  return (
    <div className="tile-radar">
      <p className="tile-radar__heading">Tile Health</p>
      <div className="tile-radar__rows">
        {ALL_TYPES.map((name) => {
          const value = game.tileValues[name] ?? 5;
          const fillPct = (value / 10) * 100;
          const color = getBarColor(value);
          const isDanger = value <= 2 || value >= 8;

          return (
            <div key={name} className={`radar-row${isDanger ? ' radar-row--danger' : ''}`}>
              <span className="radar-row__symbol">{TILE_SYMBOLS[name]}</span>
              <div className="radar-row__track">
                <div
                  className="radar-row__fill"
                  style={{ width: `${fillPct}%`, backgroundColor: color }}
                />
                <div className="radar-row__midline" />
              </div>
              <span className="radar-row__val" style={{ color }}>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

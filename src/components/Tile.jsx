import { getTileSymbol, getTileColor } from '../engine/tiles.js';

export function Tile({ tile, small = false }) {
  const symbol = getTileSymbol(tile);
  const colorClass = getTileColor(tile);

  return (
    <div className={`tile tile--${colorClass} ${small ? 'tile--small' : ''}`} title={`${tile.name} (value: ${tile.value})`}>
      <span className="tile__symbol">{symbol}</span>
      <span className="tile__value">{tile.value}</span>
      {!small && <span className="tile__name">{tile.name}</span>}
    </div>
  );
}

import { Position, Unit } from '../../../types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

export const createRemoveUnit = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (position: Position): Unit | null => {
    const unit = getUnit(position);
    if (unit) {
      ctx.grid[position.x][position.y][position.z] = null;
      unit.position = null;
    }
    return unit;
  };
}; 
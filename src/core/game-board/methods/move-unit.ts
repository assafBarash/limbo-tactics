import { Position, Unit } from '../../../types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

const clearUnitFromPosition = (unit: Unit, ctx: GameBoardContext): void => {
  if (unit.position) {
    ctx.grid[unit.position.x][unit.position.y][unit.position.z] = null;
    unit.position = null;
  }
};

const setUnitPosition = (unit: Unit, position: Position, ctx: GameBoardContext): void => {
  ctx.grid[position.x][position.y][position.z] = unit;
  unit.position = position;
};

export const createMoveUnit = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (unit: Unit, newPosition: Position): boolean => {
    if (!unit.position || getUnit(newPosition) !== null) {
      return false;
    }

    clearUnitFromPosition(unit, ctx);
    setUnitPosition(unit, newPosition, ctx);
    return true;
  };
}; 
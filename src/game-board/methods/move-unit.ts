import { Position } from '../types';
import { IUnit } from '../../units/types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

const clearUnitFromPosition = (unit: IUnit, ctx: GameBoardContext): void => {
  if (unit.position) {
    ctx.grid[unit.position.x][unit.position.y][unit.position.z] = null;
    unit.position = null;
  }
};

const setUnitPosition = (unit: IUnit, position: Position, ctx: GameBoardContext): void => {
  ctx.grid[position.x][position.y][position.z] = unit;
  unit.position = position;
};

export const createMoveUnit = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (unit: IUnit, newPosition: Position): void => {
    if (!unit.position || getUnit(newPosition) !== null) {
      return;
    }

    clearUnitFromPosition(unit, ctx);
    setUnitPosition(unit, newPosition, ctx);
  };
};

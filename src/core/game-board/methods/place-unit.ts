import { Position } from '../types';
import { IUnit } from '../../units/types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

export const createPlaceUnit = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (unit: IUnit, position: Position): void => {
    if (getUnit(position) !== null) return;

    ctx.grid[position.x][position.y][position.z] = unit;
    unit.position = position;
  };
};

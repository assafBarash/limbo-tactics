import { Unit } from '../../units/types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

export const createRemoveUnit = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (unit: Unit): boolean => {
    // If unit has no position or is not on the board, nothing to do
    if (!unit.position) return false;

    // Verify the unit is still at its position
    const currentUnit = getUnit(unit.position);
    if (!currentUnit || currentUnit.id !== unit.id) return false;

    // Remove the unit from the grid
    ctx.grid[unit.position.x][unit.position.y][unit.position.z] = null;
    unit.position = null;
    return true;
  };
}; 
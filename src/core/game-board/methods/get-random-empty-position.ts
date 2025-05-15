import { Position, Unit } from '../../../types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

const calculateDistance = (pos1: Position, pos2: Position): number =>
  Math.sqrt(
    Math.pow(pos2.x - pos1.x, 2) +
    Math.pow(pos2.y - pos1.y, 2)
  );

const generateRandomPosition = (
  ctx: GameBoardContext,
  from?: Position,
  range?: number
): Position => ({
  x: from 
    ? Math.max(0, Math.min(ctx.dimensions.width - 1, 
        from.x + Math.floor(Math.random() * range! * 2 - range!)))
    : Math.floor(Math.random() * ctx.dimensions.width),
  y: from
    ? Math.max(0, Math.min(ctx.dimensions.depth - 1,
        from.y + Math.floor(Math.random() * range! * 2 - range!)))
    : Math.floor(Math.random() * ctx.dimensions.depth),
  z: Math.floor(Math.random() * 2)
});

const isWithinRange = (from: Position, to: Position, range: number): boolean =>
  calculateDistance(from, to) <= range;

const isValidPosition = (
  position: Position,
  from: Position | undefined,
  range: number | undefined,
  getUnit: (pos: Position) => Unit | null
): boolean => {
  if (from && range && !isWithinRange(from, position, range)) {
    return false;
  }
  return getUnit(position) === null;
};

export const createGetRandomEmptyPosition = (ctx: GameBoardContext) => {
  const getUnit = createGetUnit(ctx);

  return (from?: Position, range?: number): Position | null => {
    const attempts = 100;
    
    const validPosition = Array.from({ length: attempts })
      .map(() => generateRandomPosition(ctx, from, range))
      .find(position => isValidPosition(position, from, range, getUnit));

    return validPosition ?? null;
  };
}; 
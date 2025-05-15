import { Position } from '../types';
import { IUnit } from '../../units/types';
import { GameBoardContext } from '../types';
import { createGetUnit } from './get-unit';

const calculateDistance = (pos1: Position, pos2: Position): number =>
  Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));

export const createGetUnitsInRange = ({ grid }: GameBoardContext) => {
  return (from: Position, range: number): IUnit[] =>
    Array.from(Array(grid.length))
      .flatMap((_, x) =>
        Array.from(Array(grid[x].length)).flatMap((_, y) =>
          Array.from(Array(grid[x][y].length))
            .map((_, z) => {
              const unit = grid[x][y][z];
              if (!unit) return null;

              const distance = calculateDistance(from, { x, y, z });
              return distance <= range ? unit : null;
            })
            .filter((unit): unit is IUnit => unit !== null)
        )
      )
      .flat();
};

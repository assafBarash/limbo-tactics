import { Position } from '../types';
import { IUnit } from '../../units/types';
import { GameBoardContext } from '../types';

export const createGetUnit = ({ grid, dimensions }: GameBoardContext) => {
  const isValidPosition = (position: Position): boolean =>
    position.x >= 0 &&
    position.x < dimensions.width &&
    position.y >= 0 &&
    position.y < dimensions.depth &&
    position.z >= 0 &&
    position.z < 2;

  return (position: Position): IUnit | null =>
    isValidPosition(position) ? grid[position.x][position.y][position.z] : null;
};

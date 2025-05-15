import { IUnit } from '../../units/types';
import { GameBoardContext } from '../types';

export const createGetAllUnits = ({ grid }: GameBoardContext) => {
  return (): IUnit[] =>
    grid.flatMap((plane, x) =>
      plane.flatMap((line, y) => line.filter((unit): unit is IUnit => unit !== null))
    );
};

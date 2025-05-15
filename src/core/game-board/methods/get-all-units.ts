import { Unit } from '../../../types';
import { GameBoardContext } from '../types';

export const createGetAllUnits = ({ grid }: GameBoardContext) => {
  return (): Unit[] => 
    grid.flatMap((plane, x) => 
      plane.flatMap((line, y) =>
        line.filter((unit): unit is Unit => unit !== null)
      )
    );
}; 
import { Unit } from '../units/types';
import { Position, Grid, BoardDimensions, GameBoardContext, GameBoardService } from './types';
import { createGetUnit } from './methods/get-unit';
import { createPlaceUnit } from './methods/place-unit';
import { createMoveUnit } from './methods/move-unit';
import { createRemoveUnit } from './methods/remove-unit';
import { createGetUnitsInRange } from './methods/get-units-in-range';
import { createGetRandomEmptyPosition } from './methods/get-random-empty-position';
import { createGetAllUnits } from './methods/get-all-units';

const initializeEmptyGrid = (dimensions: BoardDimensions): Grid => 
  Array.from(Array(dimensions.width))
    .map(() => 
      Array.from(Array(dimensions.depth))
        .map(() => Array(2).fill(null))
    );

export const GameBoard = (config: { dimensions: BoardDimensions }): GameBoardService => {
  const ctx: GameBoardContext = {
    grid: initializeEmptyGrid(config.dimensions),
    dimensions: config.dimensions
  };

  const getRandomEmptyPosition = createGetRandomEmptyPosition(ctx);
  const moveUnit = createMoveUnit(ctx);
  const getUnitsInRange = createGetUnitsInRange(ctx);

  return {
    getUnit: createGetUnit(ctx),
    placeUnit: createPlaceUnit(ctx),
    moveUnit,
    removeUnit: createRemoveUnit(ctx),
    getUnitsInRange,
    getRandomEmptyPosition,
    getAllUnits: createGetAllUnits(ctx),
    getState: () => ({ grid: ctx.grid })
  };
}; 
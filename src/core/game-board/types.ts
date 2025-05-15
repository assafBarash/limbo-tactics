import { Position, Unit, BoardDimensions, Grid } from '../../types';

export type GameBoardContext = {
  grid: Grid;
  dimensions: BoardDimensions;
};

export type GameBoardService = {
  getUnit: (position: Position) => Unit | null;
  placeUnit: (unit: Unit, position: Position) => boolean;
  moveUnit: (unit: Unit, position: Position) => boolean;
  getUnitsInRange: (from: Position, range: number) => Unit[];
  getRandomEmptyPosition: (from?: Position, range?: number) => Position | null;
  getAllUnits: () => Unit[];
  getState: () => { grid: Grid };
}; 
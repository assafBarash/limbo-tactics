import { Unit } from '../units/types';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Grid = (Unit | null)[][][];

export type BoardDimensions = {
  width: number;
  depth: number;
};

export type GameBoardContext = {
  grid: Grid;
  dimensions: BoardDimensions;
};

export type GameBoardService = {
  getUnit: (position: Position) => Unit | null;
  placeUnit: (unit: Unit, position: Position) => boolean;
  moveUnit: (unit: Unit, position: Position) => boolean;
  removeUnit: (unit: Unit) => boolean;
  getUnitsInRange: (from: Position, range: number) => Unit[];
  getRandomEmptyPosition: (from?: Position, range?: number) => Position | null;
  getAllUnits: () => Unit[];
  getState: () => { grid: Grid };
}; 
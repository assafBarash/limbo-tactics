import { IUnit } from '../units/types';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Grid = (IUnit | null)[][][];

export type BoardDimensions = {
  width: number;
  depth: number;
};

export type GameBoardContext = {
  grid: Grid;
  dimensions: BoardDimensions;
};

export type GameBoardService = {
  getUnit: (position: Position) => IUnit | null;
  placeUnit: (unit: IUnit, position: Position) => boolean;
  moveUnit: (unit: IUnit, position: Position) => boolean;
  removeUnit: (unit: IUnit) => boolean;
  getUnitsInRange: (from: Position, range: number) => IUnit[];
  getRandomEmptyPosition: (from?: Position, range?: number) => Position | null;
  getAllUnits: () => IUnit[];
  getState: () => { grid: Grid };
};

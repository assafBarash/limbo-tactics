import { Position, Unit, BoardDimensions, Grid } from '../types';

type GameBoardConfig = {
  dimensions: BoardDimensions;
};

export const GameBoard = (config: GameBoardConfig) => {
  // Private context setup
  const grid: Grid = Array(config.dimensions.width)
    .fill(null)
    .map(() =>
      Array(config.dimensions.depth)
        .fill(null)
        .map(() => Array(2).fill(null))
    );

  const isValidPosition = (position: Position): boolean =>
    position.x >= 0 &&
    position.x < config.dimensions.width &&
    position.y >= 0 &&
    position.y < config.dimensions.depth &&
    position.z >= 0 &&
    position.z < 2;

  // Service functions
  const getUnit = (position: Position): Unit | null =>
    isValidPosition(position)
      ? grid[position.x][position.y][position.z]
      : null;

  const placeUnit = (unit: Unit, position: Position): boolean => {
    if (!isValidPosition(position) || getUnit(position) !== null) {
      return false;
    }

    grid[position.x][position.y][position.z] = unit;
    unit.position = position;
    return true;
  };

  const removeUnit = (position: Position): Unit | null => {
    if (!isValidPosition(position)) return null;

    const unit = grid[position.x][position.y][position.z];
    if (unit) {
      grid[position.x][position.y][position.z] = null;
      unit.position = null;
    }
    return unit;
  };

  const getRandomEmptyPosition = (isAirUnit: boolean): Position | null => {
    const attempts = 100;
    for (let i = 0; i < attempts; i++) {
      const position: Position = {
        x: Math.floor(Math.random() * config.dimensions.width),
        y: Math.floor(Math.random() * config.dimensions.depth),
        z: isAirUnit ? 1 : 0
      };

      if (getUnit(position) === null) {
        return position;
      }
    }
    return null;
  };

  const getAllUnits = (): Unit[] => {
    const units: Unit[] = [];
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        for (let z = 0; z < grid[x][y].length; z++) {
          const unit = grid[x][y][z];
          if (unit) units.push(unit);
        }
      }
    }
    return units;
  };

  // Public API
  return {
    getUnit,
    placeUnit,
    removeUnit,
    getRandomEmptyPosition,
    getAllUnits,
    // Expose grid for battle state (could be made readonly if needed)
    grid
  };
}; 
import { Army, Unit, Action, Position, Grid } from '../../types';
import { GameBoardService } from '../game-board/types';

export type GameEngineListeners = {
  onUnitAction: (event: UnitActionEvent) => void;
  onTickEnd: (state: TickEndState) => void;
};

export type GameEngineContext = {
  board: GameBoardService;
  armies: readonly [Army, Army];
  listeners: GameEngineListeners;
};

export type GameState = {
  isComplete: boolean;
  winner: Army | null;
  turn: number;
};

export type UnitActionEvent = {
  unit: Unit;
  action: Action;
  target: Unit | Position;
};

export type TickEndState = {
  armies: readonly [Army, Army];
  board: Grid;
  turn: number;
};

export type GameEngineService = {
  start: () => void;
  getState: () => GameState;
}; 
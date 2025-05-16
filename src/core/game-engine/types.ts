import { IUnit, Action, Army } from '../units/types';
import { Position, Grid } from '../game-board/types';
import { GameBoardService } from '../game-board/types';

export type UnitActionEvent = {
  unit: IUnit;
  action: Action;
  target: IUnit | Position;
};

export type TickEndState = {
  armies: readonly [Army, Army];
  board: Grid;
  turn: number;
};

export type GameEngineListeners = {
  onUnitAction: (event: UnitActionEvent) => void;
  onTickEnd: (state: TickEndState) => void;
};

export type GameEngineContext = {
  board: GameBoardService;
  armies: [Army, Army];
  listeners: GameEngineListeners;
  turn?: number;
};

export type GameState = {
  isComplete: boolean;
  winner: Army | null;
  turn: number;
  board: Grid;
  armies: [Army, Army];
};

export type BattleState = {
  armies: Army[];
  board: Grid;
  isComplete: boolean;
  winner: Army | null;
  turn: number;
};

export type GameEngineService = {
  start: () => void;
  getGameTimeline: () => GameState[];
};

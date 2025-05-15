import type { Position } from '../game-board/types';
import type { GameEngineContext } from '../game-engine/types';

export type UnitType = 'knight' | 'archer';

export type ActionType = 'move' | 'attack' | 'buff' | 'debuff';

export type Cooldown = {
  lastUsed: number;
  cooldownTime: number;
};

export type ActionData = {
  id: string;
  type: ActionType;
  range: number;
  value: number;
  cooldownTime: number;
};

export type Action = {
  id: string;
  type: ActionType;
  range: number;
  value: number;
  cooldown: Cooldown;
};

export type UnitData = {
  type: UnitType;
  health: number;
  actions: ActionData[];
};

export type IUnit = UnitState & UnitActions;

export type Army = {
  id: string;
  units: IUnit[];
};

export type UnitState = {
  id: string;
  type: UnitType;
  position: Position | null;
  health: number;
  actions: Action[];
  armyId: string;
  lastAttackTime: number;
};

export type UnitActions = {
  getAvailableAction: (type: ActionType) => Action | null;
  getEnemyTarget: (targets: IUnit[]) => IUnit | null;
  executeAttack: (target: IUnit, action: Action, ctx: GameEngineContext) => void;
  executeMove: (newPos: Position, action: Action, ctx: GameEngineContext) => void;
  handleDeath: (ctx: GameEngineContext) => void;
};

export type UnitContext = {
  state: UnitState;
};

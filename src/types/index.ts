export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Grid = (Unit | null)[][][];

export type UnitType = 'knight' | 'archer';

export type Cooldown = {
  lastUsed: number;
  cooldownTime: number;
};

export type Action = {
  type: 'move' | 'attack';
  range: number;
  value: number;
  cooldown: Cooldown;
};

export type Actions = {
  move: Action;
  attack: Action;
};

export type Unit = {
  id: string;
  type: UnitType;
  position: Position | null;
  health: number;
  actions: Actions;
  armyId: string;
  lastAttackTime: number;
};

export type Army = {
  id: string;
  units: Unit[];
};

export type BoardDimensions = {
  width: number;
  depth: number;
};

export type CurriedFunction<T, U, V> = (arg1: T) => (arg2: U) => V;
export type CurriedFunctionAsync<T, U, V> = (arg1: T) => (arg2: U) => Promise<V>;

export type ActionType = 'move' | 'attack';

export type BattleState = {
  armies: Army[];
  board: Grid;
  isComplete: boolean;
  winner: Army | null;
  turn: number;
};

// Utility types for currying
export type Curry2<T1, T2, R> = (t1: T1) => (t2: T2) => R;
export type Curry3<T1, T2, T3, R> = (t1: T1) => (t2: T2) => (t3: T3) => R; 
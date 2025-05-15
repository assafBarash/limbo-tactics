export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Grid = (Unit | null)[][][];

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

export type UnitData = {
  type: UnitType;
  health: number;
  actions: ActionData[];
};

export type Action = {
  id: string;
  type: ActionType;
  range: number;
  value: number;
  cooldown: Cooldown;
};

export type BoardDimensions = {
  width: number;
  depth: number;
};

export type GameBoardService = {
  getUnit: (pos: Position) => Unit | null;
  placeUnit: (unit: Unit, pos: Position) => boolean;
  moveUnit: (unit: Unit, pos: Position) => boolean;
  getUnitsInRange: (from: Position, range: number) => Unit[];
  getRandomEmptyPosition: (from?: Position, range?: number) => Position | null;
  getAllUnits: () => Unit[];
  getState: () => { grid: Grid };
};

export type UnitActionEvent = {
  unit: Unit;
  action: Action;
  target: Unit | Position;
};

export type GameEngineListeners = {
  onUnitAction: (event: UnitActionEvent) => void;
  onTickEnd: (state: TickEndState) => void;
};

export type GameEngineContext = {
  board: GameBoardService;
  armies: readonly [Army, Army];
  listeners: GameEngineListeners;
};

export type TickEndState = {
  armies: readonly [Army, Army];
  board: Grid;
  turn: number;
};

export type GameState = {
  isComplete: boolean;
  winner: Army | null;
  turn: number;
};

export type Unit = {
  id: string;
  type: UnitType;
  position: Position | null;
  health: number;
  actions: Action[];
  armyId: string;
  lastAttackTime: number;

  // Unit behaviors
  findAvailableAction: (type: ActionType) => Action | null;
  findEnemyTarget: (targets: Unit[]) => Unit | null;
  executeAttack: (target: Unit, action: Action, ctx: GameEngineContext) => void;
  executeMove: (newPos: Position, action: Action, ctx: GameEngineContext) => void;
  handleDeath: (ctx: GameEngineContext) => void;
};

export type Army = {
  id: string;
  units: Unit[];
};

export type CurriedFunction<T, U, V> = (arg1: T) => (arg2: U) => V;
export type CurriedFunctionAsync<T, U, V> = (arg1: T) => (arg2: U) => Promise<V>;

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
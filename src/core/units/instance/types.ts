import { IUnit } from '../types';

export type UnitState = Omit<
  IUnit,
  'findAvailableAction' | 'findEnemyTarget' | 'executeAttack' | 'executeMove' | 'handleDeath'
>;

export type UnitContext = {
  state: UnitState;
};

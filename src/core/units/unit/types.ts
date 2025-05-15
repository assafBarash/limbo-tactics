import { Unit } from '../types';

export type UnitState = Omit<Unit, 'findAvailableAction' | 'findEnemyTarget' | 'executeAttack' | 'executeMove' | 'handleDeath'>;

export type UnitContext = {
  state: UnitState;
}; 
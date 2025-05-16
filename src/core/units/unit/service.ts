import { v4 as uuidv4 } from 'uuid';
import { IUnit, UnitData, UnitState } from '../types';
import {
  createGetAvailableAction,
  createGetEnemyTarget,
  createExecuteAttack,
  createExecuteMove,
  createHandleDeath,
} from './methods';

export const createUnit = (unitData: UnitData, armyId: string): IUnit => {
  const state: UnitState = {
    id: uuidv4(),
    type: unitData.type,
    position: null,
    health: unitData.health,
    armyId,
    actions: unitData.actions.map(action => ({
      ...action,
      cooldown: {
        lastUsedTurn: 0,
        cooldownTurns: action.cooldownTime,
      },
    })),
  };

  const ctx = { state };

  return {
    ...state,
    getAvailableAction: createGetAvailableAction(ctx),
    getEnemyTarget: createGetEnemyTarget(ctx),
    executeAttack: createExecuteAttack(ctx),
    executeMove: createExecuteMove(ctx),
    handleDeath: createHandleDeath(ctx),
  };
};

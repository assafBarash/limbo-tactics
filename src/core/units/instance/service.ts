import { v4 as uuidv4 } from 'uuid';
import { IUnit, UnitData } from '../types';
import { UnitContext, UnitState } from './types';
import { createFindAvailableAction } from './methods/find-available-action';
import { createFindEnemyTarget } from './methods/find-enemy-target';
import { createExecuteAttack } from './methods/execute-attack';
import { createExecuteMove } from './methods/execute-move';
import { createHandleDeath } from './methods/handle-death';

export const createUnit = (unitData: UnitData, armyId: string): IUnit => {
  const state: UnitState = {
    id: uuidv4(),
    type: unitData.type,
    position: null,
    health: unitData.health,
    lastAttackTime: 0,
    armyId,
    actions: unitData.actions.map(action => ({
      ...action,
      cooldown: {
        lastUsed: 0,
        cooldownTime: action.cooldownTime,
      },
    })),
  };

  const ctx: UnitContext = { state };

  return {
    ...state,
    findAvailableAction: createFindAvailableAction(ctx),
    findEnemyTarget: createFindEnemyTarget(ctx),
    executeAttack: createExecuteAttack(ctx),
    executeMove: createExecuteMove(ctx),
    handleDeath: createHandleDeath(ctx),
  };
};

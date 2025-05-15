import { v4 as uuidv4 } from 'uuid';
import { Unit, UnitData, Action, ActionData, ActionType, Position } from '../../types';
import { GameEngineContext } from '../game-engine/types';

// Type for unit state without behavior methods
type UnitState = Omit<Unit, 'findAvailableAction' | 'findEnemyTarget' | 'executeAttack' | 'executeMove' | 'handleDeath'>;

const createAction = (actionData: ActionData): Action => ({
  ...actionData,
  cooldown: {
    lastUsed: 0,
    cooldownTime: actionData.cooldownTime
  }
});

export const createUnit = (unitData: UnitData, armyId: string): Unit => {
  const state: UnitState = {
    id: uuidv4(),
    type: unitData.type,
    position: null,
    health: unitData.health,
    lastAttackTime: 0,
    armyId,
    actions: unitData.actions.map(createAction)
  };

  const isActionAvailable = (action: Action): boolean => {
    const now = Date.now();
    return now - action.cooldown.lastUsed >= action.cooldown.cooldownTime;
  };

  const updateActionCooldown = (action: Action): void => {
    action.cooldown.lastUsed = Date.now();
  };

  const findAvailableAction = (type: ActionType): Action | null =>
    state.actions.find(action => action.type === type && isActionAvailable(action)) ?? null;

  const findEnemyTarget = (targets: Unit[]): Unit | null => 
    targets.find(target => 
      target.id !== state.id && 
      target.armyId !== state.armyId
    ) ?? null;

  const handleDeath = (ctx: GameEngineContext): void => {
    if (state.health <= 0 && state.position) {
      ctx.board.moveUnit(state as Unit, state.position);
      state.position = null;
    }
  };

  const executeAttack = (target: Unit, action: Action, ctx: GameEngineContext): void => {
    target.health -= action.value;
    updateActionCooldown(action);
    state.lastAttackTime = Date.now();
    
    ctx.listeners.onUnitAction({
      unit: state as Unit,
      action,
      target
    });

    handleDeath(ctx);
  };

  const executeMove = (newPos: Position, action: Action, ctx: GameEngineContext): void => {
    const success = ctx.board.moveUnit(state as Unit, newPos);
    if (success) {
      updateActionCooldown(action);
      ctx.listeners.onUnitAction({
        unit: state as Unit,
        action,
        target: newPos
      });
    }
  };

  return {
    ...state,
    findAvailableAction,
    findEnemyTarget,
    executeAttack,
    executeMove,
    handleDeath
  };
}; 
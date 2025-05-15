import { IUnit, Action } from '../../types';
import { GameEngineContext } from '../../../game-engine/types';
import { UnitContext } from '../types';

const updateActionCooldown = (action: Action): void => {
  action.cooldown.lastUsed = Date.now();
};

export const createExecuteAttack = ({ state }: UnitContext) => {
  return (target: IUnit, action: Action, ctx: GameEngineContext): void => {
    target.health -= action.value;
    updateActionCooldown(action);
    state.lastAttackTime = Date.now();

    ctx.listeners.onUnitAction({
      unit: state as IUnit,
      action,
      target,
    });

    target.handleDeath(ctx);
  };
};

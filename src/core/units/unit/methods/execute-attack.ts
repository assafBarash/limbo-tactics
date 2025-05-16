import { IUnit, Action, UnitContext } from '../../types';
import { GameEngineContext } from '../../../game-engine/types';

const updateActionCooldown = (action: Action, currentTurn: number = 0): void => {
  action.cooldown.lastUsedTurn = currentTurn;
};

export const createExecuteAttack = ({ state }: UnitContext) => {
  return (target: IUnit, action: Action, ctx: GameEngineContext): void => {
    target.health -= action.value;
    updateActionCooldown(action, ctx.turn);

    ctx.listeners.onUnitAction({
      unit: state as IUnit,
      action,
      target,
    });

    target.handleDeath(ctx);
  };
};

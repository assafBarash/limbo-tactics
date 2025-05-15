import { Action, IUnit } from '../../types';
import { Position } from '../../../game-board/types';
import { GameEngineContext } from '../../../game-engine/types';
import { UnitContext } from '../types';

const updateActionCooldown = (action: Action): void => {
  action.cooldown.lastUsed = Date.now();
};

export const createExecuteMove = ({ state }: UnitContext) => {
  return (newPos: Position, action: Action, ctx: GameEngineContext): void => {
    const success = ctx.board.moveUnit(state as IUnit, newPos);
    if (success) {
      updateActionCooldown(action);
      ctx.listeners.onUnitAction({
        unit: state as IUnit,
        action,
        target: newPos,
      });
    }
  };
};

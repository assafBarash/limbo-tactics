import { Action, IUnit, UnitContext } from '../../../units/types';
import { Position } from '../../../game-board/types';
import { GameEngineContext } from '../../../game-engine/types';

const updateActionCooldown = (action: Action, currentTurn: number = 0): void => {
  action.cooldown.lastUsedTurn = currentTurn;
};

export const createExecuteMove = ({ state }: UnitContext) => {
  return (newPos: Position, action: Action, ctx: GameEngineContext): void => {
    // Store initial position to check if move was successful
    const initialPosition = state.position;

    ctx.board.moveUnit(state as IUnit, newPos);

    // Only update cooldown and fire event if position changed
    if (state.position !== initialPosition && state.position === newPos) {
      updateActionCooldown(action, ctx.turn);
      ctx.listeners.onUnitAction({
        unit: state as IUnit,
        action,
        target: newPos,
      });
    }
  };
};

import { IUnit } from '../../units/types';
import { GameEngineContext } from '../types';

export const createProcessUnitTurn = (ctx: GameEngineContext) => {
  return (unit: IUnit): void => {
    if (!unit.position || unit.health <= 0) return;

    const attackAction = unit.getAvailableAction('attack', ctx.turn);
    if (attackAction) {
      const targets = ctx.board
        .getUnitsInRange(unit.position, attackAction.range)
        .filter(target => target.health > 0);
      const target = unit.getEnemyTarget(targets);

      if (target) {
        unit.executeAttack(target, attackAction, ctx);
        return;
      }
    }

    const moveAction = unit.getAvailableAction('move', ctx.turn);
    if (moveAction) {
      const newPos = ctx.board.getRandomEmptyPosition(unit.position, moveAction.range);
      if (newPos) {
        unit.executeMove(newPos, moveAction, ctx);
      }
    }
  };
};

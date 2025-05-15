import { IUnit } from '../../units/types';
import { GameEngineContext } from '../types';

export const createProcessUnitTurn = (ctx: GameEngineContext) => {
  return (unit: IUnit): void => {
    if (!unit.position || unit.health <= 0) return;

    const attackAction = unit.findAvailableAction('attack');
    if (attackAction) {
      const targets = ctx.board
        .getUnitsInRange(unit.position, attackAction.range)
        .filter(target => target.health > 0);
      const target = unit.findEnemyTarget(targets);
      if (target) {
        unit.executeAttack(target, attackAction, ctx);
        return;
      }
    }

    const moveAction = unit.findAvailableAction('move');
    if (moveAction) {
      const newPos = ctx.board.getRandomEmptyPosition(unit.position, moveAction.range);
      if (newPos) {
        unit.executeMove(newPos, moveAction, ctx);
      }
    }
  };
};

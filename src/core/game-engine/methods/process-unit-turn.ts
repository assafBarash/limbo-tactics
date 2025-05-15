import { Unit } from '../../unit/types';
import { GameEngineContext } from '../types';

export const createProcessUnitTurn = (ctx: GameEngineContext) => {
  return (unit: Unit): void => {
    if (!unit.position || unit.health <= 0) return;

    const attackAction = unit.findAvailableAction('attack');
    if (attackAction) {
      const targets = ctx.board.getUnitsInRange(unit.position, attackAction.range);
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
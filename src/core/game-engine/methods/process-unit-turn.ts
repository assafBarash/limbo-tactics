import { Unit, Action, Position } from '../../../types';
import { GameEngineContext } from '../types';

const isActionAvailable = (action: Action): boolean => {
  const now = Date.now();
  return now - action.cooldown.lastUsed >= action.cooldown.cooldownTime;
};

const updateActionCooldown = (action: Action): void => {
  action.cooldown.lastUsed = Date.now();
};

const findEnemyTarget = (unit: Unit, targets: Unit[]): Unit | null => 
  targets.find(target => 
    target.id !== unit.id && 
    target.armyId !== unit.armyId
  ) ?? null;

const executeAttack = (attacker: Unit, target: Unit, ctx: GameEngineContext): void => {
  const attackAction = attacker.actions.attack;
  target.health -= attackAction.value;
  updateActionCooldown(attackAction);
  target.lastAttackTime = Date.now();
  
  ctx.listeners.onUnitAction({
    unit: attacker,
    action: attackAction,
    target
  });
};

const executeMove = (unit: Unit, newPos: Position, ctx: GameEngineContext): void => {
  const moveAction = unit.actions.move;
  const success = ctx.board.moveUnit(unit, newPos);
  if (success) {
    updateActionCooldown(moveAction);
    ctx.listeners.onUnitAction({
      unit,
      action: moveAction,
      target: newPos
    });
  }
};

export const createProcessUnitTurn = (ctx: GameEngineContext) => {
  return (unit: Unit): void => {
    if (!unit.position || unit.health <= 0) return;

    const attackAction = unit.actions.attack;
    if (isActionAvailable(attackAction)) {
      const targets = ctx.board.getUnitsInRange(unit.position, attackAction.range);
      const target = findEnemyTarget(unit, targets);
      if (target) {
        executeAttack(unit, target, ctx);
        return;
      }
    }

    const moveAction = unit.actions.move;
    if (isActionAvailable(moveAction)) {
      const newPos = ctx.board.getRandomEmptyPosition(unit.position, moveAction.range);
      if (newPos) {
        executeMove(unit, newPos, ctx);
      }
    }
  };
}; 
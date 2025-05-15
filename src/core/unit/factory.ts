import { v4 as uuidv4 } from 'uuid';
import { Unit, UnitType } from '../../types';

const KNIGHT_ATTACK_COOLDOWN_MS = 1200;
const KNIGHT_MOVE_COOLDOWN_MS = 1500;
const KNIGHT_MELEE_RANGE = 1;
const KNIGHT_DAMAGE = 5;

const ARCHER_ATTACK_COOLDOWN_MS = 1000;
const ARCHER_MOVE_COOLDOWN_MS = 2000;
const ARCHER_ATTACK_RANGE = 3;
const ARCHER_DAMAGE = 3;

export const createUnit = (type: UnitType, armyId: string): Unit => {
  const baseUnit = {
    id: uuidv4(),
    armyId,
    position: null,
    lastAttackTime: 0,
    health: 100,
  };

  if (type === 'knight') {
    return {
      ...baseUnit,
      type,
      actions: {
        attack: {
          type: 'attack' as const,
          cooldown: { lastUsed: 0, cooldownTime: KNIGHT_ATTACK_COOLDOWN_MS },
          range: KNIGHT_MELEE_RANGE,
          value: KNIGHT_DAMAGE,
        },
        move: {
          type: 'move' as const,
          cooldown: { lastUsed: 0, cooldownTime: KNIGHT_MOVE_COOLDOWN_MS },
          range: 2,
          value: 0,
        },
      },
    };
  }

  return {
    ...baseUnit,
    type,
    actions: {
      attack: {
        type: 'attack' as const,
        cooldown: { lastUsed: 0, cooldownTime: ARCHER_ATTACK_COOLDOWN_MS },
        range: ARCHER_ATTACK_RANGE,
        value: ARCHER_DAMAGE,
      },
      move: {
        type: 'move' as const,
        cooldown: { lastUsed: 0, cooldownTime: ARCHER_MOVE_COOLDOWN_MS },
        range: 2,
        value: 0,
      },
    },
  };
}; 
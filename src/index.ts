import { v4 as uuidv4 } from 'uuid';
import { GameEngine } from './core/game-engine/service';
import { GameBoard } from './core/game-board/service';
import { Army, UnitType, Unit } from './core/units/types';
import { Position } from './core/game-board/types';
import { createUnit } from './core/units';

// Army factory
export const createArmy = (unitTypes: UnitType[]): Army => {
  const id = uuidv4();
  const units = unitTypes.map(type => createUnit(type, id));
  return { id, units };
};

// Example battle setup
const army1 = createArmy(['knight', 'knight']);
const army2 = createArmy(['archer', 'archer']);

const dimensions = { width: 4, depth: 4 };
const board = GameBoard({ dimensions });

console.log('## setup game');

const game = GameEngine({
  board,
  armies: [army1, army2],
  listeners: {
    onUnitAction: ({ unit, action, target }) => {
      const targetDesc = (target as Unit).id ? `unit ${(target as Unit).id}` : `position (${(target as Position).x}, ${(target as Position).y})`;
      // console.log(`Unit ${unit.id} used ${action.type} on ${targetDesc}`);
    },
    onTickEnd: ({ armies, board, turn }) => {
      console.clear()
      const [army1, army2] = armies;
      console.log(`Turn ${turn} completed`);
      console.log(`Knights HP: ${army1.units.reduce((acc, unit) => acc + unit.health, 0)} units`);
      console.log(`Archers HP: ${army2.units.reduce((acc, unit) => acc + unit.health, 0)} units`);
    }
  }
});

console.log('## game start');

game.start(); 

console.log('## game end');
import { v4 as uuidv4 } from 'uuid';
import { GameEngine } from './core/game-engine/service';
import { GameBoard } from './core/game-board/service';
import { Army, UnitType, IUnit } from './core/units/types';
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
      console.log(`${unit.type} from army ${unit.armyId} used ${action.type}`);
    },
    onTickEnd: ({ armies, board, turn }) => {},
  },
});

console.log('## game start');

game.start();

const [lastState] = game.getGameTimeline().reverse();
console.log('## game end', lastState.winner);

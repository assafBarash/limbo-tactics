import { jest } from '@jest/globals';
import { GameEngine } from './service';
import { GameBoard } from '../game-board/service';
import { createUnit } from '../units';
import { Army, UnitType } from '../units/types';
import { v4 as uuidv4 } from 'uuid';

describe('GameEngine', () => {
  // Mock setTimeout to make tests run synchronously
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const createTestArmy = (unitTypes: UnitType[]): Army => {
    const id = uuidv4();
    const units = unitTypes.map(type => createUnit(type, id));
    return { id, units };
  };

  describe('win conditions', () => {
    it('should end game when all units of one army die', () => {
      // Setup armies
      const army1 = createTestArmy(['knight']);
      const army2 = createTestArmy(['knight']);

      // Setup board
      const board = GameBoard({ dimensions: { width: 10, depth: 10 } });

      // Setup game engine
      const engine = GameEngine({
        board,
        armies: [army1, army2],
        listeners: {
          onUnitAction: () => {},
          onTickEnd: () => {},
        },
      });

      // Kill all units in army1
      army1.units.forEach(unit => {
        unit.health = 0;
      });

      // Start game and get final state
      engine.start();
      const timeline = engine.getGameTimeline();
      const finalState = timeline[timeline.length - 1];

      // Verify game ended with army2 as winner
      expect(finalState.isComplete).toBe(true);
      expect(finalState.winner).toBe(army2);
      expect(finalState.turn).toBeGreaterThan(0);
    });

    it('should not end game when both armies have living units', () => {
      // Setup armies
      const army1 = createTestArmy(['knight', 'archer']);
      const army2 = createTestArmy(['knight', 'archer']);

      // Setup board
      const board = GameBoard({ dimensions: { width: 10, depth: 10 } });

      // Setup game engine
      const engine = GameEngine({
        board,
        armies: [army1, army2],
        listeners: {
          onUnitAction: () => {},
          onTickEnd: () => {},
        },
      });

      // Kill one unit from each army
      army1.units[0].health = 0;
      army2.units[0].health = 0;

      // Start game and get first turn state
      engine.start();
      const timeline = engine.getGameTimeline();
      const firstTurnState = timeline[1]; // 0 is initial state, 1 is first turn

      // Verify game continues
      expect(firstTurnState.isComplete).toBe(false);
      expect(firstTurnState.winner).toBe(null);
      expect(firstTurnState.turn).toBe(1);
    });

    it('should maintain game state across multiple turns', () => {
      // Setup armies
      const army1 = createTestArmy(['knight']);
      const army2 = createTestArmy(['knight']);

      // Setup board
      const board = GameBoard({ dimensions: { width: 10, depth: 10 } });

      // Setup game engine
      const engine = GameEngine({
        board,
        armies: [army1, army2],
        listeners: {
          onUnitAction: () => {},
          onTickEnd: () => {},
        },
      });

      // Start game and get timeline
      engine.start();
      const timeline = engine.getGameTimeline();

      // Verify initial state
      expect(timeline[0].isComplete).toBe(false);
      expect(timeline[0].turn).toBe(0);

      // Verify final state
      const finalState = timeline[timeline.length - 1];
      expect(finalState.isComplete).toBe(true);
      expect(finalState.turn).toBeGreaterThan(0);
    });
  });
});

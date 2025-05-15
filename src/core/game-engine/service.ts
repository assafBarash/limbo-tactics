import { GameEngineContext, GameState, GameEngineService } from './types';
import { createProcessUnitTurn } from './methods/process-unit-turn';

export const GameEngine = (ctx: GameEngineContext): GameEngineService => {
  const state: GameState = {
    isComplete: false,
    winner: null,
    turn: 0
  };

  const processUnitTurn = createProcessUnitTurn(ctx);

  const placeUnits = (): void => {
    ctx.armies.forEach(army => {
      army.units.forEach(unit => {
        const position = ctx.board.getRandomEmptyPosition();
        if (position) {
          ctx.board.placeUnit(unit, position);
        }
      });
    });
  };

  const checkWinCondition = (): void => {
    ctx.armies.forEach((army, index) => {
      const hasLivingUnits = army.units.some(unit => unit.health > 0);
      if (!hasLivingUnits) {
        state.isComplete = true;
        state.winner = ctx.armies[(index + 1) % 2];
      }
    });
  };

  const processTurn = (): void => {
    if (state.isComplete) return;

    [...ctx.armies[0].units, ...ctx.armies[1].units].forEach(processUnitTurn);
    checkWinCondition();
    state.turn++;

    ctx.listeners.onTickEnd({
      armies: ctx.armies,
      board: ctx.board.getState().grid,
      turn: state.turn
    });
  };

  const startGameLoop = (tickInterval: number): void => {
    const tick = () => {
      processTurn();
      if (!state.isComplete) {
        setTimeout(tick, tickInterval);
      }
    };
    tick();
  };

  return {
    start: () => {
      placeUnits();
      startGameLoop(100);
    },
    getState: () => ({ ...state })
  };
}; 
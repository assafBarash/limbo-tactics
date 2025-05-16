import { GameEngineContext, GameState, GameEngineService } from './types';
import { createProcessUnitTurn } from './methods/process-unit-turn';

export const GameEngine = (ctx: GameEngineContext): GameEngineService => {
  const initialState: GameState = {
    isComplete: false,
    winner: null,
    turn: 0,
    board: ctx.board.getState().grid,
    armies: ctx.armies,
  };

  const timeline: GameState[] = [];

  const placeUnits = (state: GameState): GameState => {
    ctx.armies.forEach(army => {
      army.units.forEach(unit => {
        const position = ctx.board.getRandomEmptyPosition();
        if (position) {
          ctx.board.placeUnit(unit, position);
        }
      });
    });
    return {
      ...state,
      board: ctx.board.getState().grid,
    };
  };

  const checkWinCondition = (state: GameState): GameState => {
    let newState = { ...state };
    ctx.armies.forEach((army, index) => {
      const hasLivingUnits = army.units.some(unit => unit.health > 0);
      if (!hasLivingUnits) {
        newState = {
          ...newState,
          isComplete: true,
          winner: ctx.armies[(index + 1) % 2],
        };
      }
    });
    return newState;
  };

  const processUnits = (state: GameState, currentTurn: number): GameState => {
    if (state.isComplete) return state;

    const turnContext: GameEngineContext = {
      ...ctx,
      turn: currentTurn,
    };
    const processTurnWithContext = createProcessUnitTurn(turnContext);
    [...ctx.armies[0].units, ...ctx.armies[1].units].forEach(processTurnWithContext);

    return {
      ...state,
      board: ctx.board.getState().grid,
      armies: ctx.armies,
    };
  };

  const processTurn = (state: GameState): GameState => {
    if (state.isComplete) return state;

    // Process units
    state = processUnits(state, state.turn);

    // Check win condition
    state = checkWinCondition(state);

    // Increment counters
    state = {
      ...state,
      turn: state.turn + 1,
    };

    // Fire events
    ctx.listeners.onTickEnd({
      armies: ctx.armies,
      board: ctx.board.getState().grid,
      turn: state.turn,
    });

    return state;
  };

  return {
    start: () => {
      let currentState = placeUnits(initialState);
      timeline.push(currentState);

      while (!currentState.isComplete) {
        currentState = processTurn(currentState);
        timeline.push(currentState);
      }
    },

    getGameTimeline: () => [...timeline],
  };
};

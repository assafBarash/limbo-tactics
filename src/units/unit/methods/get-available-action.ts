import { Action, ActionType, UnitContext } from '../../types';

const isActionAvailable = (action: Action, currentTurn: number = 0): boolean => {
  return currentTurn - action.cooldown.lastUsedTurn >= action.cooldown.cooldownTurns;
};

export const createGetAvailableAction = ({ state }: UnitContext) => {
  return (type: ActionType, turn: number = 0): Action | null =>
    state.actions.find(action => action.type === type && isActionAvailable(action, turn)) ?? null;
};

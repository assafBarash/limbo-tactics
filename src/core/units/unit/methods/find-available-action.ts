import { Action, ActionType } from '../../types';
import { UnitContext } from '../types';

const isActionAvailable = (action: Action): boolean => {
  const now = Date.now();
  return now - action.cooldown.lastUsed >= action.cooldown.cooldownTime;
};

export const createFindAvailableAction = ({ state }: UnitContext) => {
  return (type: ActionType): Action | null =>
    state.actions.find(action => action.type === type && isActionAvailable(action)) ?? null;
}; 
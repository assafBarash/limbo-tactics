import { IUnit } from '../../types';
import { UnitContext } from '../types';

export const createFindEnemyTarget = ({ state }: UnitContext) => {
  return (targets: IUnit[]): IUnit | null =>
    targets.find(target => target.id !== state.id && target.armyId !== state.armyId) ?? null;
};

import { IUnit, UnitContext } from '../../types';

export const createGetEnemyTarget = ({ state }: UnitContext) => {
  return (targets: IUnit[]): IUnit | null =>
    targets.find(target => target.id !== state.id && target.armyId !== state.armyId) ?? null;
};

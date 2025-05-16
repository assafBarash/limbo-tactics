import { UnitData, UnitType } from './types';
import { createUnit as createUnitInstance } from './unit/service';
import knightData from './data/knight.json';
import archerData from './data/archer.json';

const unitData: Record<UnitType, UnitData> = {
  knight: knightData as UnitData,
  archer: archerData as UnitData,
};

export const createUnit = (type: UnitType, armyId: string) =>
  createUnitInstance(unitData[type], armyId);

export type { UnitData };

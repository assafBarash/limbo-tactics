export * from './types';

import knightData from './data/knight.json';
import archerData from './data/archer.json';
import { UnitType, UnitData } from './types';
import { createUnit as createUnitBase } from './unit/service';

const unitData: Record<UnitType, UnitData> = {
  knight: knightData as UnitData,
  archer: archerData as UnitData
};

export const createUnit = (type: UnitType, armyId: string) => 
  createUnitBase(unitData[type], armyId);

export type { UnitData }; 
export * from './types';

import knightData from './units/knight.json';
import archerData from './units/archer.json';
import { UnitType, UnitData } from './types';
import { createUnit as createUnitBase } from './instance/service';

const unitData: Record<UnitType, UnitData> = {
  knight: knightData as UnitData,
  archer: archerData as UnitData
};

export const createUnit = (type: UnitType, armyId: string) => 
  createUnitBase(unitData[type], armyId);

export type { UnitData }; 
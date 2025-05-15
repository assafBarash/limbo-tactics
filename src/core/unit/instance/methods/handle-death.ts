import { Unit } from '../../types';
import { GameEngineContext } from '../../../game-engine/types';
import { UnitContext } from '../types';

export const createHandleDeath = ({ state }: UnitContext) => {
  return (ctx: GameEngineContext): void => {
    if (state.health <= 0) {
        console.log('## handle death of', state.type);
        
      ctx.board.removeUnit(state as Unit);
    }
  };
}; 
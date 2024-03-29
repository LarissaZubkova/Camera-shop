import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBascetProducts = (state: Pick<State, NameSpace.Bascet>): {
  [key: number]: number;
} => state[NameSpace.Bascet].basketCameras;

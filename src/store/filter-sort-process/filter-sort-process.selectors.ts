import { NameSpace } from '../../const';
import { TypeSort } from '../../types/sort-type';
import { State } from '../../types/state';

export const getSortType = (state: Pick<State, NameSpace.FilterSort>): TypeSort => state[NameSpace.FilterSort].sortType;

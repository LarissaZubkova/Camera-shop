import { NameSpace } from '../../const';
import { Filters } from '../../types/filters';
import { CameraCard } from '../../types/product';
import { State } from '../../types/state';

export const getProductsAfterFilter = (state: Pick<State, NameSpace.Filter>): CameraCard[] => state[NameSpace.Filter].filteredProducts;
export const getFilters = (state: Pick<State, NameSpace.Filter>): Filters => state[NameSpace.Filter].filters;

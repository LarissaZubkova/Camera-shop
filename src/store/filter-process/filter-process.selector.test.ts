import { NameSpace} from '../../const';
import { makeFakeProducts } from '../../utils/mock';
import { getProductsAfterFilter, getFilters } from './filter-process.selectors';

describe('product-process selectors', () => {
  const state = {
    [NameSpace.Filter]: {
      filteredProducts: makeFakeProducts(),
      filters: {
        category: '',
        type: [],
        level: [],
        minPrice: '',
        maxPrice: '',
      }
    }
  };

  it('should return filtered products from state', () => {
    const {filteredProducts} = state[NameSpace.Filter];
    const result = getProductsAfterFilter(state);
    expect(result).toEqual(filteredProducts);
  });

  it('should return filters from state', () => {
    const {filters} = state[NameSpace.Filter];
    const result = getFilters(state);
    expect(result).toEqual(filters);
  });
});

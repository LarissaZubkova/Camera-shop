import { filterProcess } from './filter-process.slice';

describe('filter process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      filteredProducts: [],
      filters: {
        category: '',
        type: [],
        level: [],
        minPrice: '',
        maxPrice: '',
      }
    };

    const result = filterProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      filteredProducts: [],
      filters: {
        category: '',
        type: [],
        level: [],
        minPrice: '',
        maxPrice: '',
      }
    };

    const result = filterProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

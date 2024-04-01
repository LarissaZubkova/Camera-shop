import { basketProcess } from './basket-process.slice';

describe('basket process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      basketCameras: {},
      coupon: null,
      couponText: '',
      couponError: false,
      hasOrderError: false,
    };

    const result = basketProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      basketCameras: {},
      coupon: null,
      couponText: '',
      couponError: false,
      hasOrderError: false,
    };

    const result = basketProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

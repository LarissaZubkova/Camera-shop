import { NameSpace} from '../../const';
import { getBasketProducts, getCoupon, getCouponError, getOrderErrorStatus } from './basket-process.selectors';

describe('basket-process selectors', () => {
  const state = {
    [NameSpace.Basket]: {
      basketCameras: {1: 1},
      coupon: 1,
      couponError: true,
      hasOrderError: false,
    }
  };

  it('should return basket products from state', () => {
    const {basketCameras} = state[NameSpace.Basket];
    const result = getBasketProducts(state);
    expect(result).toEqual(basketCameras);
  });

  it('should return coupon from state', () => {
    const {coupon} = state[NameSpace.Basket];
    const result = getCoupon(state);
    expect(result).toEqual(coupon);
  });

  it('should return coupon error from state', () => {
    const {couponError} = state[NameSpace.Basket];
    const result = getCouponError(state);
    expect(result).toEqual(couponError);
  });

  it('should return hasOrderError from state', () => {
    const {hasOrderError} = state[NameSpace.Basket];
    const result = getOrderErrorStatus(state);
    expect(result).toEqual(hasOrderError);
  });
});

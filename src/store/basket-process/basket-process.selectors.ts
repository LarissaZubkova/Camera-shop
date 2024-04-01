import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProducts = (state: Pick<State, NameSpace.Basket>): {
  [key: number]: number;
} => state[NameSpace.Basket].basketCameras;

export const getCoupon = (state: Pick<State, NameSpace.Basket>): number | null => state[NameSpace.Basket].coupon;
export const getCouponError = (state: Pick<State, NameSpace.Basket>): boolean => state[NameSpace.Basket].couponError;
export const getOrderErrorStatus = (state: Pick<State, NameSpace.Basket>): boolean => state[NameSpace.Basket].hasOrderError;
export const getCouponText = (state: Pick<State, NameSpace.Basket>): string => state[NameSpace.Basket].couponText;

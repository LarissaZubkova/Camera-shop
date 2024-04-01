import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCheckCouponAction, fetchOrdersAction } from '../api-actions';

const initialState: BasketProcess = {
  basketCameras: JSON.parse(localStorage.getItem('basket') as string) as {
    [key: number]: number;
  } || {},
  coupon: null,
  couponText: '',
  couponError: false,
  hasOrderError: false,
};

export const basketProcess = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    setBasketProduct: (state, action: PayloadAction<{id: number; count: number; isDelete?: boolean}>) => {
      const {id, count, isDelete = false} = action.payload;
      if ((state.basketCameras[id] + count) > 99) {
        state.basketCameras[id] = 99;
        return;
      }
      if (state.basketCameras[id]) {
        state.basketCameras[id] += count;
      } else {
        state.basketCameras[id] = count;
      }
      if (isDelete) {
        delete state.basketCameras[id];
      }
      localStorage.setItem('basket', JSON.stringify(state.basketCameras));
    },
    clearBasket: (state) => {
      state.basketCameras = {};
      state.coupon = null;
      localStorage.setItem('basket', JSON.stringify(state.basketCameras));
    },
    setCouponText: (state, action: PayloadAction<string>) => {
      state.couponText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCheckCouponAction.fulfilled, (state, action) => {
        state.coupon = action.payload;
        state.couponError = false;
      })
      .addCase(fetchCheckCouponAction.rejected, (state) => {
        state.couponError = true;
      })
      .addCase(fetchOrdersAction.fulfilled, (state) => {
        state.hasOrderError = false;
      })
      .addCase(fetchOrdersAction.rejected, (state) => {
        state.hasOrderError = true;
      });
  }
});

export const { setBasketProduct, clearBasket, setCouponText } = basketProcess.actions;

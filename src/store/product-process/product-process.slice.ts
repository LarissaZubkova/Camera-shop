import { createSlice } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchProductsAction, fetchPromoAction } from '../api-actions';

const initialState: ProductProcess = {
  products: [],
  promo: [],
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});

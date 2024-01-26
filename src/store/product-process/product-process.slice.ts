import { createSlice } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchProductsAction } from '../api-actions';

const initialState: ProductProcess = {
  products: [],
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  }
});
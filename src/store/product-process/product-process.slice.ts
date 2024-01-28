import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchProductsAction, fetchPromoAction } from '../api-actions';

const initialState: ProductProcess = {
  products: [],
  promo: [],
  modalIsActive: false,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.modalIsActive = action.payload;
    }
  },
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

export const { setModalActive } = productProcess.actions;

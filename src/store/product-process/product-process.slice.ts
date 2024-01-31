import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchProductsAction, fetchPromoAction, fetchProductCardAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: ProductProcess = {
  products: [],
  product: null,
  similar: [],
  isProductLoading: false,
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
      })
      .addCase(fetchProductCardAction.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProductCardAction.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      });
  }
});

export const { setModalActive } = productProcess.actions;

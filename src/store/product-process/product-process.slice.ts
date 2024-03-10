import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { ModalType, NameSpace } from '../../const';
import { fetchProductsAction, fetchPromoAction, fetchProductCardAction, fetchSimilarProductsAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: ProductProcess = {
  products: [],
  isProductsLoading: false,
  product: null,
  similar: [],
  isSimilarLoading: false,
  isProductLoading: false,
  isProductError: false,
  promo: [],
  modalActiveProduct: null,
  modalType: ModalType.Default,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setModalActiveProduct: (state, action: PayloadAction<number>) => {
      state.modalActiveProduct = state.products.find((product) => product.id === action.payload);
    },
    setModalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductLoading = false;
        toast.error('Не удалось загрузить товары');
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchProductCardAction.pending, (state) => {
        state.isProductLoading = true;
        state.isProductError = false;
      })
      .addCase(fetchProductCardAction.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = false;
        state.product = action.payload;
      })
      .addCase(fetchProductCardAction.rejected, (state) => {
        state.isProductLoading = false;
        state.isProductError = true;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isSimilarLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.isSimilarLoading = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isSimilarLoading = false;
        toast.error('Не удалось загрузить похожие товары');
      });
  }
});

export const { setModalActiveProduct, setModalType } = productProcess.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/state';
import { ModalType, NameSpace } from '../../const';
import { fetchProductsAction, fetchPromoAction, fetchProductCardAction, fetchSimilarProductsAction } from '../api-actions';
import { CameraCard } from '../../types/product';

const initialState: ProductProcess = {
  products: [],
  product: null,
  similar: [],
  isProductLoading: false,
  isProductError: false,
  promo: [],
  modalActiveProduct: null,
  modalType: ModalType.Default,
  filteredProducts: [],
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
    },
    setFilteredProducts: (state, action: PayloadAction<CameraCard[]>) => {
      state.filteredProducts = action.payload;
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
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      });
  }
});

export const { setModalActiveProduct, setModalType, setFilteredProducts } = productProcess.actions;

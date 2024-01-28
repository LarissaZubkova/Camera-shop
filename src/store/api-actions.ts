import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraProduct, ProductCard, Promo } from '../types/product';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';

export const fetchProductsAction = createAsyncThunk<CameraProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'products/getProducts',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<CameraProduct[]>(APIRoute.Products);
    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'products/getPromo',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<Promo[]>(APIRoute.Promo);
    return data;
  }
);

export const fetchProductCardAction = createAsyncThunk<ProductCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductCard',
  async(id, {extra: api}) => {
    const {data} = await api.get<ProductCard>(APIRoute.Products.replace(':id', id));
    return data;
  }
);

export const fetchSimilarProductsAction = createAsyncThunk<ProductCard[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilarProducts',
  async(id, {extra: api}) => {
    const {data} = await api.get<ProductCard[]>(`${APIRoute.Products}/${id}/similar`);
    return data;
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraCard, Promo } from '../types/product';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';

export const fetchProductsAction = createAsyncThunk<CameraCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'products/getProducts',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<CameraCard[]>(APIRoute.Products);
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

export const fetchProductCardAction = createAsyncThunk<CameraCard | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductCard',
  async(id, {extra: api}) => {
    const {data} = await api.get<CameraCard | null>(`${APIRoute.Products}/${id}`);
    return data;
  }
);

export const fetchSimilarProductsAction = createAsyncThunk<CameraCard[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilarProducts',
  async(id, {extra: api}) => {
    const {data} = await api.get<CameraCard[]>(`${APIRoute.Products}/${id}/similar`);
    return data;
  }
);

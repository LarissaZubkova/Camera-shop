import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraProduct } from '../types/product';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRout } from '../const';

export const fetchProductsAction = createAsyncThunk<CameraProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'products/getProducts',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<CameraProduct[]>(APIRout.Products);
    return data;
  }
);

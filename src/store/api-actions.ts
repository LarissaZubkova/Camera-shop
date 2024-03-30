import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraCard, CouponData, OrdersData, Promo } from '../types/product';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute, ModalType } from '../const';
import { FormReviewData, Review } from '../types/review';
import { setModalType } from './product-process/product-process.slice';
import { clearBasket } from './basket-process/basket-process.slice';

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

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchReviews',
  async(id, {extra: api}) => {
    const {data} = await api.get<Review[]>(APIRoute.Reviews.replace('id', id));
    return data;
  }
);

export const fetchSendReviewAction = createAsyncThunk<void, FormReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/sendReview',
  async(data, {dispatch, extra: api}) => {
    await api.post<void>(APIRoute.Review, data);
    dispatch(setModalType(ModalType.ReviewSuccessModal));
  }
);

export const fetchCheckCouponAction = createAsyncThunk<number, CouponData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'basket/coupon',
  async(coupon, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Coupon, coupon);
    return data;
  }
);

export const fetchOrdersAction = createAsyncThunk<void, OrdersData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'basket/order',
  async(data, {dispatch, extra: api}) => {
    await api.post<void>(APIRoute.Orders, data);
    dispatch(setModalType(ModalType.BasketSuccessModal));
    dispatch(clearBasket());
  }
);


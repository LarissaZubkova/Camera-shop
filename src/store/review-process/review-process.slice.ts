import { createSlice } from '@reduxjs/toolkit';
import { ReviewProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: ReviewProcess = {
  reviews: [],
  isReviewsLoading: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
        toast.error('Ошибка загрузки комментариев');
      });
  }
});

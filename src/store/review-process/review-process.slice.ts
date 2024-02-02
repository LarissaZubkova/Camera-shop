import { createSlice } from '@reduxjs/toolkit';
import { ReviewProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction, fetchSendReviewAction } from '../api-actions';

const initialState: ReviewProcess = {
  reviews: [],
  hasSendReviewError: false,
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSendReviewAction.pending, (state) => {
        state.hasSendReviewError = false;
      })
      .addCase(fetchSendReviewAction.fulfilled, (state) => {
        state.hasSendReviewError = false;
      })
      .addCase(fetchSendReviewAction.rejected, (state) => {
        state.hasSendReviewError = true;
      });
  }
});

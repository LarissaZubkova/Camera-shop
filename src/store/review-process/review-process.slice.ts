import { createSlice } from '@reduxjs/toolkit';
import { ReviewProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewProcess = {
  reviews: [],
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

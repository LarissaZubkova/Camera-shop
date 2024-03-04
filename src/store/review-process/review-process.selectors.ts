import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { sortByDate } from '../../utils/utils';

export const getReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].reviews;
export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => sortByDate(reviews)
);
export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isReviewsLoading;

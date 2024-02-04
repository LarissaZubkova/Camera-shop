import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { sortByDate } from '../../utils';

export const getReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].reviews;
export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => sortByDate(reviews)
);

import { makeFakeProduct, makeFakeReviews } from '../../utils/mock';
import { fetchReviewsAction } from '../api-actions';
import { reviewProcess } from './review-process.slice';

describe('review process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: makeFakeReviews(),
    };

    const result = reviewProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
    };

    const result = reviewProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with reviews with "fetchReviewsAction.fulfilled"', () => {
    const reviews = makeFakeReviews();
    const id = makeFakeProduct().id;
    const expectedState = {
      reviews,
    };

    const result = reviewProcess.reducer(undefined, fetchReviewsAction.fulfilled(reviews, '', String(id)));

    expect(result).toEqual(expectedState);
  });
});

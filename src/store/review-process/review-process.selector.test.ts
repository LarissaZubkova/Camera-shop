import { NameSpace} from '../../const';
import { makeFakeReviews } from '../../utils/mock';
import { sortByDate } from '../../utils/utils';
import { getReviews, getSortedReviews } from './review-process.selectors';

describe('product-process selectors', () => {
  const state = {
    [NameSpace.Review]: {
      reviews: makeFakeReviews(),
      isReviewsLoading: false,
    }
  };

  it('should return reviews from state', () => {
    const {reviews} = state[NameSpace.Review];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return sorted reviews from state', () => {
    const {reviews} = state[NameSpace.Review];
    const expectedReviews = sortByDate(reviews);
    const result = getSortedReviews(state);
    expect(result).toEqual(expectedReviews);
  });
});

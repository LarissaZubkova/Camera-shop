import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../utils/mock';
import ReviewList from './review-list';

describe('Component: Reviews List', () => {
  const reviews = makeFakeReviews();

  it('should render correctly', () => {
    const expectedCount = reviews.length;
    const reviewsTestId = 'review-item';

    render(<ReviewList reviews={reviews} />);
    const reviewsItem = screen.getAllByTestId(reviewsTestId);

    expect(reviewsItem.length).toBe(expectedCount);
  });
});

import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../utils/mock';
import ReviewList from './review-list';

describe('Component: Reviews List', () => {
  const reviews = makeFakeReviews();

  it('should render correctly', () => {
    const reviewsTestId = 'review-item';

    render(<ReviewList reviews={reviews} />);

    expect(screen.getByTestId(reviewsTestId)).toBeInTheDocument();
  });
});

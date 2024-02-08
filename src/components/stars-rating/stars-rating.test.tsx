import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('Component: Star Rating', () => {
  it('should render correctly', () => {
    const expectedCount = 5;
    const starItemTestId = 'star-item';

    render(<StarsRating rating={expectedCount} />);
    const starItem = screen.getAllByTestId(starItemTestId);

    expect(starItem.length).toBe(expectedCount);
  });
});

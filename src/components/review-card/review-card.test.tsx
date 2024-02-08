import { render, screen } from '@testing-library/react';
import {makeFakeReview } from '../../utils/mock';
import ReviewCard from './review-card';

describe('Component: Review Card', () => {
  const reviewCard = makeFakeReview();

  it('should render correctly', () => {
    const expectedAdvantageText = 'Достоинства:';
    const expectedDisadvantageText = 'Недостатки:';

    render(<ReviewCard reviewCard={reviewCard} />);

    expect(screen.getByText(expectedAdvantageText)).toBeInTheDocument();
    expect(screen.getByText(expectedDisadvantageText)).toBeInTheDocument();
  });
});

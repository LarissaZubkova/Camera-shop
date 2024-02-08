import { render, screen, waitFor } from '@testing-library/react';
import { ModalType } from '../../const';
import { setModalType } from '../../store/product-process/product-process.slice';
import { makeFakeReviews, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import ReviewBlock from './review-block';

describe('Component: Review Block', () => {
  const fakeStore = makeFakeStore({
    REVIEW: {
      reviews: makeFakeReviews()
    }
  });
  it('should render correctly', () => {
    const expectedText = 'Отзывы';

    const {withStoreComponent} = withStore(<ReviewBlock />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('should open modal popup on button click', async () => {
    const button = 'Оставить свой отзыв';

    const {withStoreComponent} = withStore(<ReviewBlock />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByText(button));

    waitFor(() => {
      expect(setModalType).toHaveBeenCalledWith(ModalType.AddReviewModal);
    });
  });
});

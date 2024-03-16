import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import userEvent from '@testing-library/user-event';
import ReviewSuccessModal from './review-success-modal';

describe('Component: Review Success Modal', () => {
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      isProductsLoading: false,
      product: null,
      similar: [],
      isSimilarLoading: false,
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.ReviewSuccessModal,
    }
  });

  it('should render correctly', () => {
    const expectedText = 'Спасибо за отзыв';
    const buttonText = 'Вернуться к покупкам';

    const {withStoreComponent} = withStore(<ReviewSuccessModal />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should close modal on "Врнуться к покупкам" Button', () => {
    const buttonText = 'Вернуться к покупкам';
    const modalTestId = 'review-success-modal';

    const {withStoreComponent} = withStore(<ReviewSuccessModal />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    userEvent.click(screen.getByText(buttonText));

    waitFor(() => {
      expect(screen.getByTestId(modalTestId)).not.toBeInTheDocument();
    });
  });
});

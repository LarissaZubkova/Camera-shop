import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import ModalPopup from './modal-popup';

describe('Component: Modal Popup', () => {
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.CatalogAddModal,
    }
  });

  it('should render correctly', () => {
    const expectedTestId = 'moodal';

    const {withStoreComponent} = withStore(<ModalPopup />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    });
  });

  it('should close modal on Escape key press', () => {
    const expectedTestId = 'catalog-add-modal';

    const {withStoreComponent} = withStore(<ModalPopup />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    fireEvent.keyDown(document, {key: 'Escape'});

    waitFor(() => {
      expect(expectedTestId).not.toBeInTheDocument();
    });
  });
});

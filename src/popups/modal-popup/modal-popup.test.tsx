import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import ModalPopup from './modal-popup';

vi.mock('focus-trap-react');

describe('Component: Modal Popup', () => {
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
      modalType: ModalType.CatalogAddModal,
    }
  });

  it('should render correctly', () => {
    const expectedTestId = 'modal';

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
      expect(screen.getByTestId(expectedTestId)).not.toBeInTheDocument();
    });
  });
});

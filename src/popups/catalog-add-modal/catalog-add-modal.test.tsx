import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-components';
import { setModalType } from '../../store/product-process/product-process.slice';
import { extractActionsTypes, makeFakeProduct, makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import CatalogAddModal from './catalog-add-modal';

describe('Component: Catalog Add Modal', () => {
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: makeFakeProduct(),
      modalType: ModalType.CatalogAddModal,
    }
  });

  it('should render correctly', () => {
    const titleText = 'Добавить товар в корзину';
    const buttonText = 'Добавить в корзину';

    const {withStoreComponent} = withStore(<CatalogAddModal />, fakeStore);

    render(withStoreComponent);
    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should dispatch "setModalType" when user clicked button', async () => {
    const buttonTestId = 'close-button';
    const {withStoreComponent, mockStore} = withStore(<CatalogAddModal />, fakeStore);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(buttonTestId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      setModalType.type
    ]);
  });
});

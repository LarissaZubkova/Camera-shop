import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { ModalType } from '../../const';
import { makeFakeStore, makeFakeProduct } from '../../utils/mock';
import BasketScreen from './basket-screen';

describe('Component: Coupon Form', () => {
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      isProductsLoading: false,
      product: makeFakeProduct(),
      similar: [],
      isSimilarLoading: false,
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.Default,
    },
  });

  it('should render correctly', () => {
    const expectedText = 'Корзина';
    const {withStoreComponent} = withStore(<BasketScreen />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

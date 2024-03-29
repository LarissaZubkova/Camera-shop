import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import NotFoundScreen from './not-found-screen';
import { ModalType } from '../../const';
import { makeFakeStore, makeFakeProducts } from '../../utils/mock';

describe('Component: Logo', () => {
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: makeFakeProducts(),
      isProductsLoading: false,
      product: null,
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
    const expectedText = '404 Not Found';
    const {withStoreComponent} = withStore(<NotFoundScreen />, fakeStore);
    const prepearedComponent = withHistory(withStoreComponent);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

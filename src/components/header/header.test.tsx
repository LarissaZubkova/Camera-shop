import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import Header from './header';
import { ModalType } from '../../const';
import { makeFakeStore, makeFakeProducts } from '../../utils/mock';

describe('Component: Header', () => {
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
    const expectedText = 'Каталог';
    const {withStoreComponent} = withStore(<Header />, fakeStore);
    const prepearedComponent = withHistory(withStoreComponent);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

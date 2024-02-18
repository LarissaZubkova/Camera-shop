import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeProduct, makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import ProductScreen from './product-screen';

describe('Component: Product Screen', () => {
  const product = makeFakeProduct();
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      product,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.Default,
    }
  });

  it('should render correctly', () => {
    const expectedTestId = 'product-container';
    const expectedTitle = `${product.name} - Фотошоп`;
    const {withStoreComponent} = withStore(<ProductScreen />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.getByText(expectedTestId)).toBeInTheDocument();
      expect(screen.getByTitle(expectedTitle)).toBeInTheDocument();
    });
  });
});

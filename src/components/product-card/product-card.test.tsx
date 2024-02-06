import { render, screen } from '@testing-library/react';
import { makeFakeProduct, makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';
import { withHistory, withStore } from '../../utils/mock-components';
import ProductCard from './product-card';

describe('Component: Product Card', () => {
  const product = makeFakeProduct();
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      product,
      similar: [],
      isProductLoading: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.Default,
    }
  });

  it('should render correctly', () => {
    const productTestId = 'product-container';
    const expectedRateText = 'Всего оценок:';
    const expectedPriceText = 'Цена:';
    const expectedBuyText = 'Купить';

    const {withStoreComponent} = withStore(<ProductCard product={product} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedRateText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedBuyText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import BasketCard from './basket-card';
import { ModalType } from '../../const';
import { makeFakeStore, makeFakeProduct } from '../../utils/mock';

describe('Component: Basket Card', () => {
  const setProductForDelete = vi.fn();
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
    const expectedText = 'Артикул:';
    const {withStoreComponent} = withStore(<BasketCard product={makeFakeProduct()} count={5} setProductForDelete={setProductForDelete} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(3);
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { ModalType } from '../../const';
import { makeFakeProducts, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import SimilarList from './similar-list';

describe('Component: Similar List', () => {
  const products = makeFakeProducts();
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products,
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.CatalogAddModal,
      filteredProducts: [],
    }
  });
  it('should render correctly', () => {
    const expectedText = 'Похожие товары';

    const {withStoreComponent} = withStore(<SimilarList products={products} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('should render ProductCard for each product', () => {
    const productCardTestId = 'product-card';

    const {withStoreComponent} = withStore(<SimilarList products={products} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.queryAllByTestId(productCardTestId)).toHaveLength(products.length);
    });
  });

  it('should disable prev putton when at the biginning', () => {
    const prevButton = 'Предыдущий слайд';

    const {withStoreComponent} = withStore(<SimilarList products={products} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByLabelText(prevButton)).toBeDisabled();
  });

  it('should disable next putton when at the end', () => {
    const nextButton = 'Следующий слайд';

    const {withStoreComponent} = withStore(<SimilarList products={products} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    waitFor(() => {
      expect(screen.getByLabelText(nextButton)).toBeDisabled();
    });
  });
});

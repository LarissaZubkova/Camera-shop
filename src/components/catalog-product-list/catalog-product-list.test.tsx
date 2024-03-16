import { render, screen } from '@testing-library/react';
import { ModalType } from '../../const';
import { makeFakeProducts, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogProductList from './catalog-product-list';

describe('Component: Catalog Product List', () => {
  const products = makeFakeProducts();
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products,
      isProductsLoading: false,
      product: null,
      similar: [],
      isSimilarLoading: false,
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: undefined,
      modalType: ModalType.Default,
    }
  });

  it('should render correctly', () => {
    const productTestId = 'product-item';
    const {withStoreComponent} = withStore(<CatalogProductList products={products} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
  });
});

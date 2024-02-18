import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, ModalType } from '../../const';
import { makeFakeProduct, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Catalog Screen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    expect(screen.getByTestId('pageContentElement')).toBeInTheDocument();
  });

  it('should render "Product Screen" when user navigate to "/product/:id', () => {
    const product = makeFakeProduct();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
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
    }));

    mockHistory.push(`${AppRoute.Product}${product.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('product-container')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to none-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });

});

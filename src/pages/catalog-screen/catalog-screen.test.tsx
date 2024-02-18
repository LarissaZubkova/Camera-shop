import { render, screen, waitFor } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeProducts, makeFakeStore } from '../../utils/mock';
import { ModalType } from '../../const';

describe('Component: Catalog Screen', () => {
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
      modalType: ModalType.Default,
    }
  });
  it('should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const expectedPageContantTestId = 'pageContentElement';
    const expectedSortingTestId = 'sorting';

    const {withStoreComponent} = withStore(<CatalogScreen />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.getByTestId(expectedPageContantTestId)).toBeInTheDocument();
      expect(screen.getByTestId(expectedSortingTestId)).toBeInTheDocument();
    });
  });
});

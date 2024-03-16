import { render, screen } from '@testing-library/react';
import { ModalType } from '../../const';
import { makeFakePromo, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogSwiper from './catalog-swiper';

describe('Component: Catalog Swiper', () => {
  const promo = makeFakePromo();
  const fakeStore = makeFakeStore({
    PRODUCT: {
      products: [],
      isProductsLoading: false,
      product: null,
      similar: [],
      isSimilarLoading: false,
      isProductLoading: false,
      isProductError: false,
      promo,
      modalActiveProduct: undefined,
      modalType: ModalType.Default,
    }
  });

  it('should render correctly', () => {
    const expectedTestId = 'swiper-container';

    const {withStoreComponent} = withStore(<CatalogSwiper/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should display promo cards', () => {
    const expectedTestId = 'swiper-slider';

    const {withStoreComponent} = withStore(<CatalogSwiper/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByTestId(expectedTestId)).toHaveLength(promo.length);
  });
});

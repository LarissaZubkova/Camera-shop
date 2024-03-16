import { fireEvent, render, screen } from '@testing-library/react';
import CatalogFilterForm from './catalog-filter-form';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeProducts, makeFakeStore } from '../../utils/mock';
import { CategoryFilterType, FilterType, LevelFilterType, ModalType } from '../../const';

describe('Component: Catalog Filter Form', () => {
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
    FILTER: {
      filteredProducts: makeFakeProducts(),
      filters: {
        category: CategoryFilterType.Photocamera,
        type: [FilterType.Film],
        level: [LevelFilterType.NonProfessional],
        minPrice: '100',
        maxPrice: '500',
      }
    }
  });

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<CatalogFilterForm />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should handles input change correctly', () => {
    const {withStoreComponent} = withStore(<CatalogFilterForm />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    fireEvent.click(screen.getByLabelText('Фотокамера'));
  });
});

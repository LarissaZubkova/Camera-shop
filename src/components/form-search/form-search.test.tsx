import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import FormSearch from './form-search';
import { ModalType } from '../../const';
import { makeFakePromo, makeFakeStore } from '../../utils/mock';

describe('Component: FormSearch', () => {
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
    const expectedText = 'Сбросить поиск';
    const {withStoreComponent} = withStore(<FormSearch />, fakeStore);
    const prepearedComponent = withHistory(withStoreComponent);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

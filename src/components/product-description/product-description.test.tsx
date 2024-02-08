import { render, screen } from '@testing-library/react';
import { ModalType } from '../../const';
import { makeFakeProduct, makeFakeStore } from '../../utils/mock';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import ProductDescription from './product-description';

describe('Component: Product Description', () => {
  const product = makeFakeProduct();
  it('should render correctly', () => {

    const {withStoreComponent} = withStore(<ProductDescription product={product} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(product.name)).toBeInTheDocument();
  });


  it('should open modal on "Добавить в корзину" button click', async () => {
    const fakeStore = makeFakeStore({
      PRODUCT: {
        products: [],
        product: null,
        similar: [],
        isProductLoading: false,
        promo: [],
        modalActiveProduct: product,
        modalType: ModalType.CatalogAddModal,
      }
    });

    const addButton = screen.queryByText('Добавить в корзину');

    const {withStoreComponent} = withStore(<ProductDescription product={product} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    if(addButton) {
      await userEvent.click(addButton);
    }

    expect(fakeStore.PRODUCT.modalType).toEqual(ModalType.CatalogAddModal);
  });
});

import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import DeleteFromBasketModal from './delete-from-basket-modal';
import { makeFakeProduct, makeFakeStore } from '../../utils/mock';

describe('Component: Delete From Basket Modal', () => {
  const fakeStore = makeFakeStore();
  const product = makeFakeProduct();
  it('should render correctly', () => {
    const expectedText = 'Удалить этот товар?';
    const {withStoreComponent} = withStore(<DeleteFromBasketModal product={product}/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

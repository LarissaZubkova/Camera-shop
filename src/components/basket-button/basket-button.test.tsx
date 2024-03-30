import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import BasketButton from './basket-batton';
import { makeFakeStore } from '../../utils/mock';

describe('Component: Basket Button', () => {
  const fakeStore = makeFakeStore();
  it('should render correctly', () => {
    const expectedTestId = 'basket-button';
    const {withStoreComponent} = withStore(<BasketButton />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

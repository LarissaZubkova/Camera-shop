import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import BasketSucessModal from './basket-success-modal';
import { makeFakeStore } from '../../utils/mock';

describe('Component: Basket Success Modal', () => {
  const fakeStore = makeFakeStore();
  it('should render correctly', () => {
    const expectedText = 'Спасибо за покупку';
    const {withStoreComponent} = withStore(<BasketSucessModal />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

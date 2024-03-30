import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import BasketButton from './basket-batton';

describe('Component: Basket Button', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-button';

    const preparedComponent = withHistory(<BasketButton />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

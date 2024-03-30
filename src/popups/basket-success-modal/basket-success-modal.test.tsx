import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import BasketSucessModal from './basket-success-modal';

describe('Component: Basket Success Modal', () => {
  it('should render correctly', () => {
    const expectedTestId = 'Спасибо за покупку';

    const preparedComponent = withHistory(<BasketSucessModal />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

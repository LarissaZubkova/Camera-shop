import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import DeliteFromBasketModal from './delite-from-basket-modal';
import { makeFakeProduct } from '../../utils/mock';

describe('Component: Delite From Basket Modal', () => {
  const product = makeFakeProduct();
  it('should render correctly', () => {
    const expectedTestId = 'Удалить этот товар?';

    const preparedComponent = withHistory(<DeliteFromBasketModal product={product}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

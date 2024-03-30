import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import CatalogAddSuccessModal from './catalog-add-success-modal';

describe('Component: Catalog Add Success Modal', () => {
  it('should render correctly', () => {
    const expectedTestId = 'Товар успешно добавлен в корзину';

    const preparedComponent = withHistory(<CatalogAddSuccessModal />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

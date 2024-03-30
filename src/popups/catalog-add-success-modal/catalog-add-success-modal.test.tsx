import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import CatalogAddSuccessModal from './catalog-add-success-modal';
import { makeFakeStore } from '../../utils/mock';

describe('Component: Catalog Add Success Modal', () => {
  const fakeStore = makeFakeStore();
  it('should render correctly', () => {
    const expectedText = 'Товар успешно добавлен в корзину';
    const {withStoreComponent} = withStore(<CatalogAddSuccessModal />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

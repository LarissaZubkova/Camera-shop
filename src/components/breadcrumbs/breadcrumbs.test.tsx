import { withHistory } from '../../utils/mock-componets';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

describe('Component: FilmDetails', () => {
  const isProduct = true;
  it('should render correctly', () => {
    const expectedMainText = 'Главная';
    const expectedCatalogText = 'Каталог';

    const preparedComponent = withHistory(<Breadcrumbs isProduct={isProduct} />);

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
  });
});

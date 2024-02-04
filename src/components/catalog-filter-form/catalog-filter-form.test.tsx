import { render, screen } from '@testing-library/react';
import CatalogFilterForm from './catalog-filter-form';

describe('Component: Catalog Filter Form', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    render(<CatalogFilterForm />);
    const filterText = screen.getByTestId(expectedText);
    const form = screen.getByRole('form');

    expect(filterText).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('disables checkbox', () => {
    const selectedFilter = 'Плёночная';

    render(<CatalogFilterForm />);
    const checked = screen.getByLabelText(selectedFilter);

    expect(checked).toBeDisabled();
  });
});

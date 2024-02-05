import { render, screen } from '@testing-library/react';
import CatalogFilterForm from './catalog-filter-form';

describe('Component: Catalog Filter Form', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    render(<CatalogFilterForm />);
    const filterText = screen.getByText(expectedText);
    const button = screen.getByRole('button');

    expect(filterText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables checkbox', () => {
    const selectedFilter = 'Плёночная';

    render(<CatalogFilterForm />);
    const checked = screen.getByLabelText(selectedFilter);

    expect(checked).toBeDisabled();
  });
});

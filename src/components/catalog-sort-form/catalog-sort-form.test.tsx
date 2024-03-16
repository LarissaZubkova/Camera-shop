import { render, screen, fireEvent } from '@testing-library/react';
import CatalogSortForm from './catalog-sort-form';
import { withHistory } from '../../utils/mock-components';

describe('Component: Catalog Sort Form', () => {
  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const labelPriceText = 'по цене';
    const labelPopularText = 'по популярности';
    const upSortTestId = 'up-sort';
    const downSortTestId = 'down-sort';

    const prepearedComponent = withHistory(<CatalogSortForm />);
    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPriceText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPopularText)).toBeInTheDocument();
    expect(screen.getByTestId(upSortTestId)).toBeInTheDocument();
    expect(screen.getByTestId(downSortTestId)).toBeInTheDocument();
  });

  it('should change sort type on radio button change', () => {
    const prepearedComponent = withHistory(<CatalogSortForm />);
    const {getByTestId} = render(prepearedComponent);
    const sortPriceRadio = getByTestId('sort-price') as HTMLInputElement;

    fireEvent.change(sortPriceRadio, {target: {checked: true}});

    expect(sortPriceRadio.checked).toBe(true);
  });
});


import { render, screen } from '@testing-library/react';
import { makeFakeProducts } from '../../utils/mock';
import CatalogProductList from './catalog-product-list';

describe('Component: Catalog Product List', () => {
  const products = makeFakeProducts();

  it('should render correctly', () => {
    const expectedCount = products.length;
    const productTestId = 'product-item';

    render(<CatalogProductList products={products} />);
    const productItem = screen.getAllByTestId(productTestId);

    expect(productItem.length).toBe(expectedCount);
  });
});

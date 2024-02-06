import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = 'Интернет-магазин фото- и видеотехники';

    const prepearedComponent = withHistory(<Footer />);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

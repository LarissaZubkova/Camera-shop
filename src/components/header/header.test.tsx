import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-componets';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';

    const prepearedComponent = withHistory(<Header />);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

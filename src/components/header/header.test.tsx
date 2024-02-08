import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

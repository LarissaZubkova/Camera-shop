import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-componets';
import NotFoundScreen from './not-found-screen';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = '404 Not Found';

    const prepearedComponent = withHistory(<NotFoundScreen />);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingScreen />);
    const loadingText = screen.getByText(expectedText);

    expect(loadingText).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import UpButton from './up-button';

describe('Component: Up Button', () => {
  it('should render correctly', () => {
    const buttonTestId = 'up-button';

    render(<UpButton />);

    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });
});

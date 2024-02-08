import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../utils/mock-components';

describe('Component: Pagination', () => {
  const generalCount = 10;
  it('should render correctly', () => {
    const paginationTestId = 'pagination-container';
    const preparedComponent = withHistory(<Pagination generalCount={generalCount} />);

    render(preparedComponent);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
  });

  it('should change page on clicking "Назад" button', () => {
    const backButton = screen.queryByTestId('back-button');
    const expectedText = '1';
    const preparedComponent = withHistory(<Pagination generalCount={generalCount} />);

    render(preparedComponent);

    if(backButton) {
      fireEvent.click(backButton);

      expect(screen.getByText(expectedText).classList.contains('pagination__link--active')).toBe(true);
    }
  });

  it('should change page on clicking "Назад" button', () => {
    const forwardButton = screen.queryByTestId('forward-button');
    const expectedText = '11';
    const preparedComponent = withHistory(<Pagination generalCount={generalCount} />);

    render(preparedComponent);

    if(forwardButton) {
      fireEvent.click(forwardButton);

      expect(screen.getByText(expectedText).classList.contains('pagination__link--active')).toBe(true);
    }
  });
});

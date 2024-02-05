import { render, screen } from '@testing-library/react';
import { makeFakePromoCard } from '../../utils/mock';
import { withHistory } from '../../utils/mock-componets';
import Banner from './banner';

describe('Component: Banner', () => {
  const card = makeFakePromoCard();
  it('should render correctly', () => {
    const expectedMessageText = 'Новинка!';
    const expectedBannerText = /Профессиональная камера/i;

    const preparedComponent = withHistory(<Banner card={card} />);

    render(preparedComponent);

    expect(screen.getByText(expectedMessageText)).toBeInTheDocument();
    expect(screen.getByText(expectedBannerText)).toBeInTheDocument();
  });
});

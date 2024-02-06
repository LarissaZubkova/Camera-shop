import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import AddReviewModal from './add-review-modal';

describe('Component: Product Card', () => {
  it('should render correctly', () => {
    const expectedFormText = 'Оставить отзыв';
    const expectedRatingText = 'Рейтинг';
    const expectedRatingTestId = 'rate-bar';
    const expectedNameLabelText = 'Ваше имя';
    const expectedAdvantageLabelText = 'Достоинства';
    const expectedDisadvantageLabelText = 'Недостатки';
    const expectedReviewLabelText = 'Комментарий';

    const {withStoreComponent} = withStore(<AddReviewModal />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedRatingTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedFormText)).toBeInTheDocument();
    expect(screen.getByText(expectedRatingText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedNameLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedAdvantageLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedDisadvantageLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedReviewLabelText)).toBeInTheDocument();
  });

  it ('should render correctly when ser enter data', async () => {
    const nameTestId = 'name';
    const advantageTestId = 'advantage';
    const disadvantageTestId = 'disadvantage';
    const commentTestId = 'comment';
    const expectedName = 'Keks';
    const expectedAdvantage = 'Good product';
    const expectedDisadvantage = 'Bad product';
    const expectedComment = 'Good product and Bad product';

    const {withStoreComponent} = withStore(<AddReviewModal />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(nameTestId),
      expectedName
    );
    await userEvent.type(
      screen.getByTestId(advantageTestId),
      expectedAdvantage
    );
    await userEvent.type(
      screen.getByTestId(disadvantageTestId),
      expectedDisadvantage
    );
    await userEvent.type(
      screen.getByTestId(commentTestId),
      expectedComment
    );

    expect(screen.getByDisplayValue(expectedName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedAdvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedDisadvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedComment)).toBeInTheDocument();
  });
});

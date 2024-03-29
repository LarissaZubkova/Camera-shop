import { Review } from '../../types/review';
import { getDateFormat } from '../../utils/utils';
import StarsRating from '../stars-rating/stars-rating';

type ReviewCardProp = {
    reviewCard: Review;
}

function ReviewCard({reviewCard}: ReviewCardProp): JSX.Element {
  const {userName, rating, advantage, disadvantage, createAt, review} = reviewCard;
  const dateTime = getDateFormat(createAt).dateTime;
  const date = getDateFormat(createAt).reviewDate;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateTime}>{date}</time>
      </div>
      <div className="rate review-card__rate">
        <StarsRating rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;

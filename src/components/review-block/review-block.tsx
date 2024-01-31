import { useState, useEffect } from 'react';
import { COUNT_STEP, SCROLL_MEANING } from '../../const';
import { useAppSelector } from '../../hooks';
import { getSortedReviews } from '../../store/review-process/review-process.selectors';
import ReviewList from '../review-list/review-list';

function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getSortedReviews);
  const [reviewsCount, setReviewsCount] = useState(COUNT_STEP);
  const currentReviews = reviews.slice(0, reviewsCount);

  const scrollHandler = (e: Event) => {
    e.preventDefault();
    if ((e.target as Document).documentElement.scrollHeight -
    (window.scrollY + window.innerHeight) < SCROLL_MEANING) {
      setReviewsCount((prev) => prev + COUNT_STEP);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ReviewList reviews={currentReviews} />
          <div className="review-block__buttons">
            {reviewsCount < reviews.length &&
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => setReviewsCount((prev) => prev + COUNT_STEP)}
            >Показать больше отзывов
            </button>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewBlock;
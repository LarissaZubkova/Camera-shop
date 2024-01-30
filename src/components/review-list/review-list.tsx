import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/review-process/review-process.selectors';
import ReviewCard from '../review-card/review-card';

function ReviewList(): JSX.Element {
  const reviews = useAppSelector(getReviews);

  return (
    <ul className="review-block__list">
      {reviews.map((review) => <ReviewCard key={review.id} reviewCard={review} />)}
    </ul>
  );
}

export default ReviewList;

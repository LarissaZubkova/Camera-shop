import { STAR_COUNT } from '../../const';

type StarsRatingProps = {
  rating: number;
}

function StarsRating({rating}: StarsRatingProps): JSX.Element {
  return (
    <>
      {Array.from({length: STAR_COUNT}, (_, i) => i).map((item) => (
        <svg key={item} width={17} height={16} aria-hidden="true" data-testid="star-item">
          <use xlinkHref={item < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default StarsRating;

type StarsRatingProps = {
  rating: number;
}

function StarsRating({rating}: StarsRatingProps): JSX.Element {
  return (
    <>
      {Array.from({length: 5}, (_, i) => i).map((item) => (
        <svg key={item} width={17} height={16} aria-hidden="true">
          <use xlinkHref={item < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </>
  );
}

export default StarsRating;

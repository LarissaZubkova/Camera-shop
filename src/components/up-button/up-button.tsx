import { Link } from 'react-scroll';

function UpButton(): JSX.Element {
  return (
    <Link
      className="up-btn"
      to="header"
      smooth
      duration={2000}
      data-testid="up-button"
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}

export default UpButton;

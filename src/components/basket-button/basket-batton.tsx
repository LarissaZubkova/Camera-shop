import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getBascetProducts } from '../../store/bascet-process/bascet-process.selectors';
import { AppRoute } from '../../const';

function BasketButton(): JSX.Element {
  const basket = useAppSelector(getBascetProducts);
  const basketCount = Object.values(basket).reduce((total, count) => total + count, 0);

  return (
    <Link className="header__basket-link" to={AppRoute.Bascet}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketCount !== 0 && <span className="header__basket-count">{basketCount}</span>}
    </Link>
  );
}

export default BasketButton;

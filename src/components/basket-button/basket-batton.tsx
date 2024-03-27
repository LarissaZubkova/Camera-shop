import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getBascetProducts } from '../../store/bascet-process/bascet-process.selectors';
import { AppRoute } from '../../const';

function BasketButton(): JSX.Element {
  const basket = useAppSelector(getBascetProducts);

  return (
    <Link className="header__basket-link" to={AppRoute.Bascet}>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basket.length !== 0 && <span className="header__basket-count">{basket.length}</span>}
    </Link>
  );
}

export default BasketButton;

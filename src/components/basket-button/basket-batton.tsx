import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getBasketProducts } from '../../store/basket-process/basket-process.selectors';
import { AppRoute } from '../../const';

function BasketButton(): JSX.Element {
  const basket = useAppSelector(getBasketProducts);
  const basketCount = Object.values(basket).reduce((total, count) => total + count, 0);

  return (
    <Link
      className="header__basket-link"
      to={AppRoute.Basket}
      data-testid="basket-button"
    >
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketCount !== 0 && <span className="header__basket-count">{basketCount}</span>}
    </Link>
  );
}

export default BasketButton;

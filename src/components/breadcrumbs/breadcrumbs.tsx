import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsPros = {
  isProduct?: boolean;
  children?: React.ReactNode;
}

function Breadcrumbs({isProduct, children}: BreadcrumbsPros): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {!isProduct ? <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span> :
              <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>}
          </li>
          {children}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;

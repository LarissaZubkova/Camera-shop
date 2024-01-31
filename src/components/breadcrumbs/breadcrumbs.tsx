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
            <a className="breadcrumbs__link" href="index.html">Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </a>
          </li>
          <li className="breadcrumbs__item">
            {!isProduct ? <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span> :
              <a className="breadcrumbs__link" href="catalog.html">Каталог
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </a>}
          </li>
          {children}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;

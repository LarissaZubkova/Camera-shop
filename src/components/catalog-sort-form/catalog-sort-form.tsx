import { useSearchParams } from 'react-router-dom';
import { SortDirection, SortType } from '../../const';
import { ChangeEvent } from 'react';

type Params = {
  sort: string;
  'sort-icon': string;
  [key: string] : string;
}

function CatalogSortForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.id;
    const name = evt.target.name;
    const sort = searchParams.get('sort') || SortType.Price;
    const sortIcon = searchParams.get('sort-icon') || SortDirection.Up;
    const params: Params = {sort, ['sort-icon']: sortIcon};
    params[name] = value;

    setSearchParams(params);
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio"
              data-testid="sort-price"
              id="sortPrice"
              name="sort"
              checked = {searchParams.get('sort') === SortType.Price}
              onChange={handleInputClick}
            />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input
              type="radio"
              id="sortPopular"
              name="sort"
              checked = {searchParams.get('sort') === SortType.Popular}
              onChange={handleInputClick}
            />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input
              type="radio"
              id="up"
              name="sort-icon"
              aria-label="По возрастанию"
              data-testid="up-sort"
              checked = {searchParams.get('sort-icon') === SortDirection.Up}
              onChange={handleInputClick}
            />
            <label htmlFor="up">
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input
              type="radio"
              id="down"
              name="sort-icon"
              aria-label="По убыванию"
              data-testid="down-sort"
              checked = {searchParams.get('sort-icon') === SortDirection.Down}
              onChange={handleInputClick}
            />
            <label htmlFor="down">
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CatalogSortForm;

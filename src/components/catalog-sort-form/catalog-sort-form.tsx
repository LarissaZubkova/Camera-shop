import { SortDirection, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortType } from '../../store/filter-sort-process/filter-sort-process.selectors';
import { setSortType } from '../../store/filter-sort-process/filter-sort-process.slice';

function CatalogSortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);

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
              checked = {sortType.type === SortType.Price}
              onChange={() => {
                if (sortType.direction === SortDirection.Default) {
                  dispatch(setSortType({direction: SortDirection.Up, type: SortType.Price}));
                } else {
                  dispatch(setSortType({...sortType, type: SortType.Price}));
                }
              }}
            />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input
              type="radio"
              id="sortPopular"
              name="sort"
              checked = {sortType.type === SortType.Popular}
              onChange={() => {
                if (sortType.direction === SortDirection.Default) {
                  dispatch(setSortType({direction: SortDirection.Up, type: SortType.Popular}));
                } else {
                  dispatch(setSortType({...sortType, type: SortType.Popular}));
                }
              }}
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
              checked = {sortType.direction === SortDirection.Up}
              onChange={() => {
                if (sortType.type === SortType.Default) {
                  dispatch(setSortType({type: SortType.Price, direction: SortDirection.Up}));
                } else {
                  dispatch(setSortType({...sortType, direction: SortDirection.Up}));
                }
              }}
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
              checked = {sortType.direction === SortDirection.Down}
              onChange={() => {
                if (sortType.type === SortType.Default) {
                  dispatch(setSortType({type: SortType.Price, direction: SortDirection.Down}));
                } else {
                  dispatch(setSortType({...sortType, direction: SortDirection.Down}));
                }
              }}
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

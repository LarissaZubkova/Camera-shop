import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/product-process/product-process.selectors';
import { CameraCard } from '../../types/product';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import './form-search.css';
import { getFilteredProducts } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function FormSearch(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<CameraCard[] | null>(null);
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchedProducts(getFilteredProducts(products, searchValue));
  },[products, searchValue]);

  return (
    <FocusTrap
      active={Boolean(searchedProducts?.length)}
      tabIndex={-1}
    >
      <div className={classNames('form-search', {'list-opened': searchedProducts?.length})}>
        <form>
          <label>
            <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchValue}
              onChange={(evt) => setSearchValue(evt.currentTarget.value)}
            />
          </label>
          <ul className="form-search__select-list">
            {searchedProducts &&
          searchedProducts.map((product: CameraCard) => (
            <li
              key={product.id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => navigate(`${AppRoute.Product}${product.id}`)}
            >{product.name}
            </li>))}
          </ul>
        </form>
        <button
          className={classNames('form-search__reset', {'form-search__reset-opend' : searchValue})}
          type="reset"
          onClick={() => {
            if (searchValue) {
              setSearchValue('');
            }
          }}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
    </FocusTrap>
  );
}

export default FormSearch;

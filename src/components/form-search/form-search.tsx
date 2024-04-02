import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/product-process/product-process.selectors';
import { CameraCard } from '../../types/product';
import { getFilteredProducts } from '../../utils/utils';
import './form-search.css';

function FormSearch(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<CameraCard[] | null>(null);
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchedProducts(getFilteredProducts(products, searchValue));
  },[products, searchValue]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (searchedProducts?.length){
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchedProducts]);

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
              ref={inputRef}
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              value={searchValue}
              onChange={(evt) => setSearchValue(evt.currentTarget.value)}
            />
          </label>
          <ul
            className="form-search__select-list"
            onWheel={(evt) => evt.preventDefault()}
            onKeyDown={(evt: KeyboardEvent<HTMLUListElement>) => {
              const target = evt.target as HTMLLIElement;
              if (evt.key === 'ArrowDown' && target.nextElementSibling) {
                const prev = target.nextElementSibling as HTMLLIElement;
                prev.focus();
              }
              if (evt.code === 'ArrowUp' && target.previousElementSibling) {
                const next = target.previousElementSibling as HTMLLIElement;
                next.focus();
              }
              if(evt.code === 'Enter' && target.firstChild) {
                const link = target.firstChild as HTMLAnchorElement;
                link.click();
              }
            }}
          >
            {searchedProducts &&
          searchedProducts.map((product: CameraCard) => (
            <li
              key={product.id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={() => navigate(`${AppRoute.Product}${product.id}`)}
            >
              <Link
                to={`${AppRoute.Product}/${product.id}`}
                tabIndex={-1}
              >
                {product.name}
              </Link>
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
            focusInput();
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

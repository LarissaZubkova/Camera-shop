import { getPaginationCount } from '../../utils';
import { useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER, PAGE_STEP } from '../../const';

type PaginationProps = {
  generalCount: number;
}

function Pagination({generalCount}: PaginationProps): JSX.Element {
  const pagination = getPaginationCount(generalCount);
  const {pathname} = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER;
  const [page, setPages] = useState(DEFAULT_PAGE_NUMBER);

  const isBackButton = page > PAGE_STEP;
  const isNextButton = page + PAGE_STEP < pagination && page + PAGE_STEP !== pagination;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {isBackButton &&
        <li className="pagination__item" onClick={() => setPages((prev) => prev - PAGE_STEP)}>
          <Link className="pagination__link" to={`${pathname}?page=${page - 1}`} >Назад</Link>
        </li>}
        {Array.from({length: 3}, (_,i) => page + i).map((item) =>
          (
            <li key={item} className="pagination__item">
              <Link className={classNames('pagination__link', {'pagination__link--active' : currentPage === item})} to={`${pathname}?page=${item}`} >{item}</Link>
            </li>
          )
        )}
        {isNextButton &&
        <li className="pagination__item" onClick={() => setPages((prev) => prev + PAGE_STEP)}>
          <Link className="pagination__link pagination__link--text" to={`${pathname}?page=${page + PAGE_STEP}`} >Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;

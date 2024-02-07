import classNames from 'classnames';
import { getPageCount, getPaginationCount } from '../../utils/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER, COUNT_STEP } from '../../const';

type PaginationProps = {
  generalCount: number;
}

function Pagination({generalCount}: PaginationProps): JSX.Element {
  const pagination = getPaginationCount(generalCount);
  const {pathname} = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPages] = useState(DEFAULT_PAGE_NUMBER);
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER;
  const pageCount = getPageCount(pagination, page);
  const isBackButton = page > COUNT_STEP;
  const isNextButton = page + COUNT_STEP < pagination && page + COUNT_STEP !== pagination;

  return (
    <div className="pagination" data-testid="pagination-container">
      <ul className="pagination__list">
        {isBackButton &&
        <li className="pagination__item" data-testid="back-button" onClick={() => setPages((prev) => prev - COUNT_STEP)}>
          <Link className="pagination__link" to={`${pathname}?page=${page - 1}`} >Назад</Link>
        </li>}
        {Array.from({length: pageCount}, (_,i) => page + i).map((item) =>
          (
            <li key={item} className="pagination__item">
              <Link className={classNames('pagination__link', {'pagination__link--active' : currentPage === item})} to={`${pathname}?page=${item}`} >{item}</Link>
            </li>
          )
        )}
        {isNextButton &&
        <li className="pagination__item" data-testid="back-button" onClick={() => setPages((prev) => prev + COUNT_STEP)}>
          <Link className="pagination__link pagination__link--text" to={`${pathname}?page=${page + COUNT_STEP}`} ></Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;

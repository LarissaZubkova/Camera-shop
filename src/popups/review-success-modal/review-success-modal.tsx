import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';
import { AppRoute } from '../../const';
import { fetchReviewsAction } from '../../store/api-actions';

function ReviewSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => {
            navigate(AppRoute.Catalog);
            dispatch(setModalType(''));
          }}
        >Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => {
          dispatch(setModalType(''));
          if (id) {
            dispatch(fetchReviewsAction(id));
          }
        }}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default ReviewSuccessModal;

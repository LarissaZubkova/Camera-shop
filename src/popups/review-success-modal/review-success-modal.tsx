import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';
import { ModalType } from '../../const';
import { fetchReviewsAction } from '../../store/api-actions';
import { useRef } from 'react';
import { useOverlayListener } from '../../hooks/use-overlay-listener';

function ReviewSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const {id} = useParams();

  useOverlayListener(modalRef);

  return (
    <div className="modal__content" ref={modalRef} data-testid="review-success-modal" >
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => {
            dispatch(setModalType(ModalType.Default));
          }}
        >Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => {
          dispatch(setModalType(ModalType.Default));
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

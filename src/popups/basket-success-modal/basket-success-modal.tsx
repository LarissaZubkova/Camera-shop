import { useNavigate } from 'react-router-dom';
import { AppRoute, ModalType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';

function BasketSucessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => {
            dispatch(setModalType(ModalType.Default));
            navigate(AppRoute.Catalog);
          }}
        >Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => dispatch(setModalType(ModalType.Default))}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketSucessModal;

import { useNavigate } from 'react-router-dom';
import { AppRoute, ModalType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';

function CatalogAddSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="modal__content">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <a
          className="btn btn--transparent modal__btn"
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(setModalType(ModalType.Default));
          }}
        >
          Продолжить покупки
        </a>
        <button
          className="btn btn--purplemodal__btn modal__btn--fit-width"
          onClick={() => {
            navigate(AppRoute.Bascet);
          }}
        >Перейти в корзину
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default CatalogAddSuccessModal;

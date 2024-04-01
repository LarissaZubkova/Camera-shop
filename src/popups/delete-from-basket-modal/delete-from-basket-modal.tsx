import { ModalType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBasketProducts } from '../../store/basket-process/basket-process.selectors';
import { setBasketProduct } from '../../store/basket-process/basket-process.slice';
import { setModalType } from '../../store/product-process/product-process.slice';
import { CameraCard } from '../../types/product';

type DeliteFromBasketModalProps = {
  product: CameraCard;
}

function DeliteFromBasketModal({product}: DeliteFromBasketModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasketProducts);
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, vendorCode, type, level, id} = product;
  const count = basket[id];
  const handleModalClose = () => {
    dispatch(setModalType(ModalType.Default));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
            <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width={140} height={120} alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type}</li>
            <li className="basket-item__list-item">{level}</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={() => {
            dispatch(setBasketProduct({id, count: -count, isDelete: true}));
            dispatch(setModalType(ModalType.Default));
          }}
        >Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            handleModalClose();
          }}
        >Продолжить покупки
        </a>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={handleModalClose}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default DeliteFromBasketModal;

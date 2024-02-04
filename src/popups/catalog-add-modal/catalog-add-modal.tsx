import { useRef } from 'react';
import { ModalType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useOverlayListener } from '../../hooks/use-overlay-listener';
import { getModalActiveProduct } from '../../store/product-process/product-process.selectors';
import { setModalType } from '../../store/product-process/product-process.slice';
import { getMoneyFormat } from '../../utils';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function CatalogAddModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getModalActiveProduct);
  const modalRef = useRef<HTMLDivElement>(null);

  useOverlayListener(modalRef);

  if (!product) {
    return <LoadingScreen />;
  }

  const {previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, name, vendorCode, type, category, price} = product;

  return (
    <div className="modal__content" ref={modalRef} >
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            {<source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />}
            <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width={140} height={120} alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type}</li>
            <li className="basket-item__list-item">{category}</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{getMoneyFormat(price)}</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
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

export default CatalogAddModal;

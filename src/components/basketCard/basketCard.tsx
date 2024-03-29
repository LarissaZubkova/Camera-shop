import { useAppDispatch } from '../../hooks';
import { setBascetProduct } from '../../store/bascet-process/bascet-process.slice';
import { CameraCard } from '../../types/product';
import { getMoneyFormat } from '../../utils/utils';

type BasketCardProps = {
  product: CameraCard;
  count: number;
}

function BasketCard({product, count}: BasketCardProps):JSX.Element {
  const dispatch = useAppDispatch();
  const {name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, vendorCode, type, level, price, id} = product;

  const handleCountChange = () => {
    if (!count) {
      dispatch(setBascetProduct({id, count: 1}));
    }
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width={140} height={120} alt={name}/>
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
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{getMoneyFormat(price)}</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => {
            if (count <= 1) {
              return;
            }
            dispatch(setBascetProduct({id, count: -1}));
          }}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          onChange={(evt) => {
            const value = Number(evt.target.value);

            dispatch(setBascetProduct({id, count: (value - count)}));
          }}
          onBlur={handleCountChange}
          onKeyDown={(evt) => {
            if(evt.code === 'Enter') {
              handleCountChange();
            }
          }}
          type="number"
          id="counter1"
          value={count === 0 ? '' : count}
          min="1"
          max="99"
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => dispatch(setBascetProduct({id, count: 1}))}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getMoneyFormat(count * price)}</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketCard;

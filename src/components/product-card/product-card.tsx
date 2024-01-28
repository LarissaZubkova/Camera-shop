import { CameraProduct } from '../../types/product';
import { setModalActive } from '../../store/product-process/product-process.slice';
import { useAppDispatch } from '../../hooks';

type ProductCardProps = {
  product: CameraProduct;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x" />
          <img src={product?.previewImg} srcSet={product?.previewImg2x} width={280} height={240} alt={product?.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {product?.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
        </div>
        <p className="product-card__title">Ретрокамера Das Auge IV</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => dispatch(setModalActive(true))}
        >Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее</a>
      </div>
    </div>
  );
}

export default ProductCard;

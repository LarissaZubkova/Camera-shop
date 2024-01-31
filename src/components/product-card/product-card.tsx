import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute, ProductTab } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setModalActiveProduct } from '../../store/product-process/product-process.slice';
import { getMoneyFormat } from '../../utils';
import { CameraCard } from '../../types/product';
import StarsRating from '../stars-rating/stars-rating';

type ProductCardProps = {
  product: CameraCard;
  isActive?: boolean;
}

function ProductCard({product, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImg, previewImg2x, name, previewImgWebp, previewImgWebp2x, reviewCount, price, rating, id} = product;
  return (
    <div className={classNames('product-card', {'is-active' : isActive})}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width={280} height={240} alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarsRating rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getMoneyFormat(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => dispatch(setModalActiveProduct(id))}
        >Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}${id}?tab=${ProductTab.Description}`} >Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;

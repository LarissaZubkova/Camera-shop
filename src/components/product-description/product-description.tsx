import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setModalActiveProduct, setModalType } from '../../store/product-process/product-process.slice';
import { getMoneyFormat } from '../../utils';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_TAB, ModalType, ProductTab } from '../../const';
import { CameraCard} from '../../types/product';
import StarsRating from '../../components/stars-rating/stars-rating';

type ProductDescriptionProps = {
  product: CameraCard;
}

function ProductDescription({product}: ProductDescriptionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [searchParams] = useSearchParams();
  const checkedTab = searchParams.get('tab') || DEFAULT_TAB;
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, rating, reviewCount, price, vendorCode, category, type, level, description, id} = product;

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
              <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width={560} height={480} alt={name} />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{name}</h1>
            <div className="rate product__rate">
              <StarsRating rating={rating} />
              <p className="visually-hidden">Рейтинг: {rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{getMoneyFormat(price)}</p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={() => {
                dispatch(setModalActiveProduct(id));
                dispatch(setModalType(ModalType.CatalogAddModal));
              }}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                {Object.values(ProductTab).map((tab) => (
                  <button
                    key={tab}
                    className={classNames('tabs__control', {'is-active' : tab === checkedTab})}
                    type="button"
                    onClick={() => navigate(`${pathname}?tab=${tab}`)}
                  >{tab}
                  </button>
                ))}
              </div>
              <div className="tabs__content">
                <div className={classNames('tabs__element', {'is-active' : checkedTab === ProductTab.Property})}>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{level}</p>
                    </li>
                  </ul>
                </div>
                <div className={classNames('tabs__element', {'is-active' : checkedTab === ProductTab.Description})}>
                  <div className="product__tabs-text">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDescription;

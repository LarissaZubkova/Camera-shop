import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BasketCard from '../../components/basket-card/basket-card';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CouponForm from '../../components/coupon-form/coupon-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalPopup from '../../popups/modal-popup/modal-popup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBasketProducts, getCoupon, getOrderErrorStatus } from '../../store/basket-process/basket-process.selectors';
import { getModalType, getProducts } from '../../store/product-process/product-process.selectors';
import { CameraCard } from '../../types/product';
import { getDscount, getMoneyFormat, getSummary } from '../../utils/utils';
import { fetchOrdersAction, fetchProductsAction } from '../../store/api-actions';
import { COUPONS, ModalType } from '../../const';

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);
  const products = useAppSelector(getProducts);
  const basket = useAppSelector(getBasketProducts);
  const hasOrderError = useAppSelector(getOrderErrorStatus);
  const camerasIds = Object.keys(basket).map((item) => Number(item));
  const currentProducts = products.filter((product) => Object.prototype.hasOwnProperty.call(basket, product.id));
  const totalPrice = currentProducts.reduce((total, product) => {
    const quantity = basket[product.id];
    return total + (quantity * product.price);
  }, 0);
  const coupon = useAppSelector(getCoupon);
  const couponData = coupon ? COUPONS[coupon] : '';
  const discount = getDscount(coupon, totalPrice);
  const [productForDelite, setProductForDelite] = useState<CameraCard | null>(null);
  const modalType = useAppSelector(getModalType);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {
            <Breadcrumbs isProduct>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">Корзина
                </span>
              </li>
            </Breadcrumbs>
          }
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {!currentProducts.length && <p>Корзина пуста</p>}
              <ul className="basket__list">
                {currentProducts.map((product) => <BasketCard key={product.id} product={product} count={basket[product.id]} setProductForDelite={setProductForDelite} />)}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <CouponForm />
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{getMoneyFormat(totalPrice)}</span></p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={classNames('basket__summary-value', {'basket__summary-value--bonus' : coupon})}>{getMoneyFormat(discount)}</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">{getSummary(totalPrice, discount)}</span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    disabled={!currentProducts.length}
                    onClick={() => {
                      dispatch(fetchOrdersAction({camerasIds, coupon: couponData}));
                    }}
                  >Оформить заказ
                  </button>
                  {hasOrderError && <p style={{color: 'red'}}>Попробуйте еще раз</p>}
                </div>
              </div>
            </div>
          </section>
        </div>
        {modalType === ModalType.DeliteFromBasket && productForDelite && <ModalPopup product={productForDelite} />}
        {modalType === ModalType.BasketSuccessModal && <ModalPopup />}
      </main>
      <Footer />
    </div>
  );
}

export default BasketScreen;

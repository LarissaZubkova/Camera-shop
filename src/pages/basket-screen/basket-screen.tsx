import BasketCard from '../../components/basketCard/basketCard';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBascetProducts } from '../../store/bascet-process/bascet-process.selectors';
import { getProducts } from '../../store/product-process/product-process.selectors';
import { getMoneyFormat } from '../../utils/utils';

function BasketScreen(): JSX.Element {
  const products = useAppSelector(getProducts);
  const basket = useAppSelector(getBascetProducts);
  const currentProducts = products.filter((product) => Object.prototype.hasOwnProperty.call(basket, product.id));
  const totalPrice = currentProducts.reduce((total, product) => {
    const quantity = basket[product.id];
    return total + (quantity * product.price);
  }, 0);

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
              <ul className="basket__list">
                {currentProducts.map((product) => <BasketCard key={product.id} product={product} count={basket[product.id]}/>)}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{getMoneyFormat(totalPrice)}</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BasketScreen;

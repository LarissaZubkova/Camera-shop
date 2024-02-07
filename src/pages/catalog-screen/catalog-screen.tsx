import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PRODUCTS_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import { getModalType, getProducts } from '../../store/product-process/product-process.selectors';
import { getCurrentProductsList } from '../../utils/utils';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogProductList from '../../components/catalog-product-list/catalog-product-list';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import CatalogSwiper from '../../components/catalog-swiper/catalog-swiper';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ModalPopup from '../../popups/modal-popup/modal-popup';

function CatalogScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER;
  const products = useAppSelector(getProducts);
  const modalType = useAppSelector(getModalType);
  const currentProducts = getCurrentProductsList(products, currentPage);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Header />
      <main>
        <CatalogSwiper />
        <div className="page-content" data-testid="pageContentElement">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside" data-testid="sorting">
                  <div className="catalog-filter">
                    <CatalogFilterForm />
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <CatalogSortForm />
                  </div>
                  <CatalogProductList products={currentProducts} />
                  {products.length > DEFAULT_PRODUCTS_COUNT && <Pagination generalCount={products.length} />}
                </div>
              </div>
            </div>
          </section>
        </div>
        {modalType && <ModalPopup />}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

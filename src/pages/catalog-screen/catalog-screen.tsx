import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CatalogProductCards from '../../components/catalog-product-cards/catalog-product-cards';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import Pagination from '../../components/pagination/pagination';
import CatalogAddItim from '../../popups/catalog-add-item/catalog-add-item';
import { mockProducts } from '../../mock/mock-products';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PRODUCTS_COUNT } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { getCurrentProductsList } from '../../utils';
import CatalogSwiper from '../../components/catalog-swiper/catalog-swiper';
import { useAppSelector } from '../../hooks';
import { getModalActiveStatus } from '../../store/product-process/product-process.selectors';

function CatalogScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER;
  const products = getCurrentProductsList(mockProducts, currentPage);
  const isModalActive = useAppSelector(getModalActiveStatus);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Header />
      <main>
        <CatalogSwiper />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <CatalogFilterForm />
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <CatalogSortForm />
                  </div>
                  <CatalogProductCards products={products} />
                  {mockProducts.length > DEFAULT_PRODUCTS_COUNT && <Pagination generalCount={mockProducts.length} />}
                </div>
              </div>
            </div>
          </section>
        </div>
        {isModalActive && <CatalogAddItim />}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

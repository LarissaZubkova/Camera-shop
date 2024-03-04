import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterType, DEFAULT_PAGE_NUMBER, DEFAULT_PRODUCTS_COUNT, FilterType, LevelFilterType, SortDirection } from '../../const';
import { useAppSelector } from '../../hooks';
import { getModalType, getProducts, getProductsLoadingStatus } from '../../store/product-process/product-process.selectors';
import { getCurrentProductsList, getProductsByFilters, getSortedProducts } from '../../utils/utils';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';
import { setFilteredProducts } from '../../store/product-process/product-process.slice';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilterForm from '../../components/catalog-filter-form/catalog-filter-form';
import CatalogProductList from '../../components/catalog-product-list/catalog-product-list';
import CatalogSortForm from '../../components/catalog-sort-form/catalog-sort-form';
import CatalogSwiper from '../../components/catalog-swiper/catalog-swiper';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ModalPopup from '../../popups/modal-popup/modal-popup';
import LoadingScreen from '../loading-screen/loading-screen';

function CatalogScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE_NUMBER;
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductsLoadingStatus);
  const dispatch = useAppDispatch();
  const sortType = {type: searchParams.get('sort'), direction: searchParams.get('sort-icon')} as {
    type: string;
    direction: SortDirection;
  };
  const category = searchParams.get('category') as CategoryFilterType;
  const type = searchParams.get('type')?.split(',') as FilterType[];
  const level = searchParams.get('level')?.split(',') as LevelFilterType[];
  const minPrice = Number(searchParams.get('_start'));
  const maxPrice = Number(searchParams.get('_end'));
  const filteredProducts = getProductsByFilters(products, category, type, level, minPrice, maxPrice);
  const sortedProducts = getSortedProducts(filteredProducts, sortType);
  const modalType = useAppSelector(getModalType);
  const currentProducts = getCurrentProductsList(sortedProducts, currentPage);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilteredProducts(filteredProducts));
  }, [dispatch, filteredProducts]);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
                  {!currentProducts.length && <p>по вашему запросу ничего не найдено</p>}
                  {currentProducts.length && <CatalogProductList products={currentProducts} />}
                  {sortedProducts.length > DEFAULT_PRODUCTS_COUNT && <Pagination generalCount={sortedProducts.length} />}
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

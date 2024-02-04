import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductCardAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getModalType, getProductCard, getProductLoadingStatus, getSimilar } from '../../store/product-process/product-process.selectors';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductDescription from '../../components/product-description/product-description';
import SimilarList from '../../components/similar-list/similar-list';
import LoadingScreen from '../loading-screen/loading-screen';
import ReviewBlock from '../../components/review-block/review-block';
import UpButton from '../../components/up-button/up-button';
import ModalPopup from '../../popups/modal-popup/modal-popup';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProductCard);
  const similar = useAppSelector(getSimilar);
  const isProductLoading = useAppSelector(getProductLoadingStatus);
  const modalType = useAppSelector(getModalType);
  const productId = useParams().id;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductCardAction(productId));
      dispatch(fetchSimilarProductsAction(productId));
      dispatch(fetchReviewsAction(productId));
    }
  }, [productId, dispatch]);

  if (isProductLoading || !product) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper" >
      <Helmet>
        <title>{`${product.name} - Фотошоп`}</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content" >
          <Breadcrumbs isProduct>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
            </li>
          </Breadcrumbs>
          <ProductDescription product={product} />
          {similar.length && <SimilarList products={similar} />}
          <ReviewBlock />
        </div>
        {modalType && <ModalPopup />}
      </main>
      <UpButton />
      <Footer />
    </div>
  );
}

export default ProductScreen;

import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import { useEffect } from 'react';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={`${AppRoute.Product}:id`} element={<ProductScreen />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;

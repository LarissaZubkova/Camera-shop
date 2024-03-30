
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={`${AppRoute.Product}:id`} element={<ProductScreen />} />
        <Route path={AppRoute.Basket} element={<BasketScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;

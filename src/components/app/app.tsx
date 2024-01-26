import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import Catalog from '../../pages/catalog/catalog';
import { useEffect } from 'react';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Catalog />
    </HelmetProvider>
  );
}

export default App;

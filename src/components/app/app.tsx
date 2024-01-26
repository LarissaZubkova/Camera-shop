import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import Catalog from '../../pages/catalog/catalog';
import { useEffect } from 'react';
import { fetchProductsAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Catalog />
    </HelmetProvider>
  );
}

export default App;

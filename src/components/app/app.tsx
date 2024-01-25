import { HelmetProvider } from 'react-helmet-async';
import Catalog from '../../pages/catalog/catalog';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Catalog />
    </HelmetProvider>
  );
}

export default App;

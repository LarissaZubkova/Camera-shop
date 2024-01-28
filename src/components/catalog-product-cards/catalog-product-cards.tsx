import { CameraProduct } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogProductCardsProps = {
  products: CameraProduct[];
}

function CatalogProductCards({products}: CatalogProductCardsProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}

export default CatalogProductCards;

import { CameraCard } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogProductListProps = {
  products: CameraCard[];
}

function CatalogProductList({products}: CatalogProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="product-item">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}

export default CatalogProductList;

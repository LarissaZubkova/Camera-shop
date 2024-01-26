import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/product-process/product-process.selectors';
import ProductCard from '../product-card/product-card';

function CatalogProductCards(): JSX.Element {
  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}

export default CatalogProductCards;

import { CameraProduct } from '../../types/product';
import { useState } from 'react';
import ProductCard from '../product-card/product-card';
import { SIMILAR_COUNT_STAP } from '../../const';

type SimilarListProps = {
  products: CameraProduct[];
}

function SimilarList({products}: SimilarListProps): JSX.Element {
  const [similarCount, setSimilarCount] = useState(SIMILAR_COUNT_STAP);
  const currentSimilar = products.slice(similarCount - SIMILAR_COUNT_STAP, similarCount);

  const isBackButton = similarCount === SIMILAR_COUNT_STAP;
  const isNextButton = products.length === similarCount || products.length < similarCount && products.length > similarCount - SIMILAR_COUNT_STAP;

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {currentSimilar.map((product) => <ProductCard key={product.id} product={product} isActive/>)}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => setSimilarCount((prev) => prev - SIMILAR_COUNT_STAP)}
              disabled={isBackButton}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={() => setSimilarCount((prev) => prev + SIMILAR_COUNT_STAP)}
              disabled={isNextButton}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarList;

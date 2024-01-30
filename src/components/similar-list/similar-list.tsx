import { CameraCard } from '../../types/product';
import { useState } from 'react';
import { SIMILAR_COUNT_STEP } from '../../const';
import ProductCard from '../product-card/product-card';
import './similar-list.css';

type SimilarListProps = {
  products: CameraCard[];
}

function SimilarList({products}: SimilarListProps): JSX.Element {
  const [similarCount, setSimilarCount] = useState(SIMILAR_COUNT_STEP);
  const currentSimilar = products.slice(similarCount - SIMILAR_COUNT_STEP, similarCount);
  const isBackButton = similarCount === SIMILAR_COUNT_STEP;
  const isNextButton = products.length === similarCount || products.length < similarCount && products.length > similarCount - SIMILAR_COUNT_STEP;

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
              className="controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => setSimilarCount((prev) => prev - SIMILAR_COUNT_STEP)}
              disabled={isBackButton}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={() => setSimilarCount((prev) => prev + SIMILAR_COUNT_STEP)}
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

import { NameSpace, ModalType} from '../../const';
import { makeFakeProduct, makeFakeProducts, makeFakePromo } from '../../utils/mock';
import { getModalActiveProduct, getModalType, getProductCard, getProductLoadingStatus, getProducts, getPromo, getSimilar } from './product-process.selectors';

describe('product-process selectors', () => {
  const state = {
    [NameSpace.Product]: {
      products: makeFakeProducts(),
      product: makeFakeProduct(),
      similar: makeFakeProducts(),
      isProductLoading: false,
      isProductError: false,
      promo: makeFakePromo(),
      modalActiveProduct: makeFakeProduct(),
      modalType: ModalType.AddReviewModal,
    }
  };

  it('should return products from state', () => {
    const {products} = state[NameSpace.Product];
    const result = getProducts(state);
    expect(result).toEqual(products);
  });

  it('should return product card from state', () => {
    const {product} = state[NameSpace.Product];
    const result = getProductCard(state);
    expect(result).toEqual(product);
  });

  it('should return similar products from state', () => {
    const {similar} = state[NameSpace.Product];
    const result = getSimilar(state);
    expect(result).toEqual(similar);
  });

  it('should return promo products from state', () => {
    const {promo} = state[NameSpace.Product];
    const result = getPromo(state);
    expect(result).toEqual(promo);
  });

  it('should return modal active product product from state', () => {
    const {modalActiveProduct} = state[NameSpace.Product];
    const result = getModalActiveProduct(state);
    expect(result).toEqual(modalActiveProduct);
  });

  it('should return product data loading status', () => {
    const {isProductLoading} = state[NameSpace.Product];
    const result = getProductLoadingStatus(state);
    expect(result).toBe(isProductLoading);
  });

  it('should return product data error status', () => {
    const {isProductError} = state[NameSpace.Product];
    const result = getProductLoadingStatus(state);
    expect(result).toBe(isProductError);
  });

  it('should return modal type from state', () => {
    const {modalType} = state[NameSpace.Product];
    const result = getModalType(state);
    expect(result).toBe(modalType);
  });
});

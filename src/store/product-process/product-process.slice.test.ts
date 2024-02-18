import { ModalType } from '../../const';
import { makeFakeProduct, makeFakeProducts, makeFakePromo } from '../../utils/mock';
import { fetchProductCardAction, fetchProductsAction, fetchPromoAction, fetchSimilarProductsAction } from '../api-actions';
import { productProcess, setModalActiveProduct, setModalType } from './product-process.slice';

describe('product process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      products: makeFakeProducts(),
      product: makeFakeProduct(),
      similar: makeFakeProducts(),
      isProductLoading: false,
      isProductError: false,
      promo: makeFakePromo(),
      modalActiveProduct: makeFakeProduct(),
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "products" to array with products with "fetchProductsAction.fulfilled"', () => {
    const products = makeFakeProducts();
    const expectedState = {
      products,
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchProductsAction.fulfilled(products, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isProductLoading" to true, "isProductErroe" to false with "fetchProductCardAction.pending"', () => {
    const expectedState = {
      products: [],
      product: null,
      similar: [],
      isProductLoading: true,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchProductCardAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isProductLoading" to false, , "isProductErroe" to false, "product" to product with "fetchProductCardAction.fulfilled"', () => {
    const product = makeFakeProduct();
    const expectedState = {
      products: [],
      product,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchProductCardAction.fulfilled(product, '', String(product.id)));

    expect(result).toEqual(expectedState);
  });

  it('should set "isProductLoading" to false, , "isProductErroe" to true, "product" to product with "fetchProductCardAction.rejected"', () => {
    const expectedState = {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: true,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchProductCardAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "promo" to array with promo with "fetchPromoAction.fulfilled"', () => {
    const promo = makeFakePromo();
    const expectedState = {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo,
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchPromoAction.fulfilled(promo, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "similar" to array with similar with "fetchSimilarProductsAction.fulfilled"', () => {
    const similar = makeFakeProducts();
    const id = makeFakeProduct().id;
    const expectedState = {
      products: [],
      product: null,
      similar,
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(undefined, fetchSimilarProductsAction.fulfilled(similar, '', String(id)));

    expect(result).toEqual(expectedState);
  });

  it('should return "modalActiveProduct" to modalActiveProduct with "setModalActiveProduct" action', () => {
    const products = makeFakeProducts();
    const modalActiveProduct = products[0];
    const expectedState = {
      products,
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct,
      modalType: ModalType.Default,
    };

    const result = productProcess.reducer(expectedState, setModalActiveProduct(modalActiveProduct.id));

    expect(result).toEqual(expectedState);
  });

  it('should return "modalType" to modalType with "setModalType" action', () => {
    const expectedState = {
      products: [],
      product: null,
      similar: [],
      isProductLoading: false,
      isProductError: false,
      promo: [],
      modalActiveProduct: null,
      modalType: ModalType.AddReviewModal,
    };

    const result = productProcess.reducer(undefined, setModalType(ModalType.AddReviewModal));

    expect(result).toEqual(expectedState);
  });
});

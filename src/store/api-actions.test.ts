import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { APIRoute } from '../const';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AppThunkDispatch, extractActionsTypes, makeFakeProduct, makeFakeProducts, makeFakePromo, makeFakeReview, makeFakeReviews } from '../utils/mock';
import { fetchCheckCouponAction, fetchOrdersAction, fetchProductCardAction, fetchProductsAction, fetchPromoAction, fetchReviewsAction, fetchSendReviewAction, fetchSimilarProductsAction } from './api-actions';
import { setModalType } from './product-process/product-process.slice';
import { clearBasket } from './basket-process/basket-process.slice';

describe('Async axtions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({PRODUCT: {products: []}});
  });

  describe('fetchProductsAction', () => {
    it('should dispatch "fetchProductsAction.pending" and "fetchProductsAction.fulfilled" when server response 200', async () => {
      const mockProducts = makeFakeProducts();
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(mockProducts);
    });

    it('should dispatch "fetchProductsAction.pending" and "fetchProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchProductsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.fulfilled" when server response 200', async () => {
      const mockPromo = makeFakePromo();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromo);
    });

    it('should dispatch "fetchPromoAction.pending" and "fetchPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type,
      ]);
    });
  });

  describe('fetchProductCardAction', () => {
    const mockProduct = makeFakeProduct();

    it('should dispatch "fetchProductCardAction.pending" and "fetchProductCardAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}`).reply(200, mockProduct);

      await store.dispatch(fetchProductCardAction(String(mockProduct.id)));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductCardActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductCardAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProductCardAction.pending.type,
        fetchProductCardAction.fulfilled.type,
      ]);

      expect(fetchProductCardActionFulfilled.payload).toEqual(mockProduct);
    });

    it('should dispatch "fetchProductCardAction.pending" and "fetchProductCardAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockProduct.id}`).reply(400, {});

      await store.dispatch(fetchProductCardAction(String(mockProduct.id)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductCardAction.pending.type,
        fetchProductCardAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarProductsAction', () => {
    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.fulfilled" when server response 200', async () => {
      const id = makeFakeProduct().id.toString();
      const mockSimilar = makeFakeProducts();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${id}/similar`).reply(200, mockSimilar);

      await store.dispatch(fetchSimilarProductsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarProductsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(mockSimilar);
    });

    it('should dispatch "fetchSimilarProductsAction.pending" and "fetchSimilarProductsAction.rejected" when server response 400', async () => {
      const id = makeFakeProduct().id.toString();
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${id}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarProductsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" when server response 200', async () => {
      const id = makeFakeProduct().id.toString();
      const mockReviews = makeFakeReviews();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace('id', id)).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSendReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.rejected" when server response 400', async () => {
      const id = makeFakeProduct().id.toString();
      mockAxiosAdapter.onGet(APIRoute.Reviews.replace('id', id)).reply(400, []);

      await store.dispatch(fetchReviewsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchSendReviewAction', () => {
    it('should dispatch "fetchSendReviewAction.pending"  and "fetchSendReviewAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.Review).reply(200);

      await store.dispatch(fetchSendReviewAction(mockReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSendReviewAction.pending.type,
        setModalType.type,
        fetchSendReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSendReviewAction.pending" and "fetchSendReviewAction.rejected" when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.Review).reply(400);

      await store.dispatch(fetchSendReviewAction(mockReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSendReviewAction.pending.type,
        fetchSendReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchCheckCouponAction', () => {
    it('should dispatch "fetchCheckCouponAction.pending"  and "fetchCheckCouponAction.fulfilled" when server response 200', async () => {
      const couponData = {coupon: 'coupon'};
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(200);

      await store.dispatch(fetchCheckCouponAction(couponData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCheckCouponAction.pending.type,
        fetchCheckCouponAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchCheckCouponAction.pending" and "fetchCheckCouponAction.rejected" when server response 400', async () => {
      const couponData = {coupon: 'coupon'};
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(400);

      await store.dispatch(fetchCheckCouponAction(couponData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCheckCouponAction.pending.type,
        fetchCheckCouponAction.rejected.type,
      ]);
    });
  });

  describe('fetchOrdersAction', () => {
    it('should dispatch "fetchOrdersAction.pending"  and "fetchOrdersAction.fulfilled" when server response 200', async () => {
      const orderData = {
        camerasIds: [1],
        coupon: 'camera-333',
      };
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(200);

      await store.dispatch(fetchOrdersAction(orderData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchOrdersAction.pending.type,
        setModalType.type,
        clearBasket.type,
        fetchOrdersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOrdersAction.pending" and "fetchOrdersAction.rejected" when server response 400', async () => {
      const orderData = {camerasIds: [1], coupon: 'coupon'};
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(400);

      await store.dispatch(fetchOrdersAction(orderData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOrdersAction.pending.type,
        fetchOrdersAction.rejected.type,
      ]);
    });
  });
});

import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });


  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Catalog);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Catalog);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = {type: '', payload: AppRoute.Catalog};
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Catalog);
  });

  it('should redirect to "/product/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Product);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Product);
  });
});

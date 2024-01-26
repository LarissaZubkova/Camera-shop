import { store } from '../store/index';
import { CameraProduct } from './product';

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type ProductProcess = {
    products: CameraProduct[];
}
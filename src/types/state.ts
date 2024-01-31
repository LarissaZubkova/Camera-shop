import { store } from '../store/index';
import { Promo, CameraCard } from './product';
import { Review } from './review';

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type ProductProcess = {
    products: CameraCard[];
    product: CameraCard | null;
    similar: CameraCard[];
    isProductLoading: boolean;
    promo: Promo[];
    modalIsActive: boolean;
}

export type ReviewProcess = {
    reviews: Review[];
}

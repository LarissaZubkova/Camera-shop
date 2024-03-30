import { CameraCard, Promo } from '../types/product';
import { random, system, datatype, date, name } from 'faker';
import { Review } from '../types/review';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { createAPI } from '../services/api';
import { ModalType } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

const TYPES = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const CATEGORIES = ['Видеокамера', 'Фотоаппарат'];
const LEVELS = ['Любительский', 'Нулевой', 'Профессиональный'];

function randomInteger(min:number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const makeFakeProduct = (): CameraCard => ({
  id: datatype.number(),
  name: random.words(),
  vendorCode: crypto.randomUUID(),
  type: TYPES[Math.floor(Math.random() * TYPES.length)],
  category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
  description: random.words(),
  level: LEVELS[Math.floor(Math.random() * LEVELS.length)],
  price: datatype.number(),
  rating: randomInteger(1,5),
  reviewCount: datatype.number(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeProducts = (): CameraCard[] => Array.from({length: 10}, makeFakeProduct);

export const makeFakeReview = (): Review => ({
  id: crypto.randomUUID(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: name.findName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: randomInteger(1,5),
});

export const makeFakeReviews = (): Review[] => Array.from({length: 10}, makeFakeReview);

export const makeFakePromoCard = (): Promo => ({
  id: datatype.number(),
  name: random.words(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakePromo = (): Promo[] => Array.from({length: 10}, makeFakePromoCard);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  PRODUCT: {
    products: [],
    isProductsLoading: false,
    product: null,
    similar: [],
    isSimilarLoading: false,
    isProductLoading: false,
    isProductError: false,
    promo: [],
    modalActiveProduct: undefined,
    modalType: ModalType.Default,
  },
  REVIEW: {reviews: [], isReviewsLoading: false},
  FILTER: {
    filteredProducts: [],
    filters: {
      category: '',
      type: [],
      level: [],
      minPrice: '',
      maxPrice: '',
    },
  },
  BASKET: {
    basketCameras: {},
    coupon: null,
    couponError: false,
    hasOrderError: false,
  },
  ...initialState ?? {},
});

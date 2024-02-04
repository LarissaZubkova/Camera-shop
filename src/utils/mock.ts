import { CameraCard } from '../types/product';
import { random, system, datatype, date, name } from 'faker';
import { Review } from '../types/review';

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

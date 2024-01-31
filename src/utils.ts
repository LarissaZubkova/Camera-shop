import { DEFAULT_PRODUCTS_COUNT } from './const';
import { CameraProduct } from './types/product';

export function getPaginationCount(count: number): number {
  return Math.ceil(count / DEFAULT_PRODUCTS_COUNT);
}

export function getCurrentProductsList(products: CameraProduct[], page: number) {
  return products.slice(page * DEFAULT_PRODUCTS_COUNT - DEFAULT_PRODUCTS_COUNT, page * DEFAULT_PRODUCTS_COUNT);
}

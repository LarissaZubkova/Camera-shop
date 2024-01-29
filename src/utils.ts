import { DEFAULT_PRODUCTS_COUNT } from './const';
import { CameraCard } from './types/product';

export function getPaginationCount(count: number): number {
  return Math.ceil(count / DEFAULT_PRODUCTS_COUNT);
}

export function getCurrentProductsList(products: CameraCard[], page: number) {
  return products.slice(page * DEFAULT_PRODUCTS_COUNT - DEFAULT_PRODUCTS_COUNT, page * DEFAULT_PRODUCTS_COUNT);
}

export function getMoneyFormat(data: number) {
  let moneyFormat;

  if (data) {
    moneyFormat = data.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0});
  }

  return moneyFormat;
}

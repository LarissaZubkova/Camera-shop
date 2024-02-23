import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DEFAULT_PRODUCTS_COUNT, DateFormat, COUNT_STEP, SortDirection, SortType } from '../const';
import { CameraCard } from '../types/product';
import { Review } from '../types/review';
import { TypeSort } from '../types/sort-type';

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

export function getDateFormat(date: string) {
  const dateTime = dayjs(date).format(DateFormat.DateTimeFormat);
  const reviewDate = dayjs(date).locale('ru').format(DateFormat.ReviewDateFormat);
  return {dateTime, reviewDate};
}

function sortByTop(reviewA: Review, reviewB: Review) {
  return dayjs(reviewB.createAt).diff(reviewA.createAt);
}

export function sortByDate(reviews: Review[]) {
  return [...reviews].sort(sortByTop);
}

export function getPageCount(pagination: number, page: number): number {
  if ((pagination - page) < COUNT_STEP) {
    return pagination % COUNT_STEP;
  }
  return COUNT_STEP;
}

export function validateName(value: string) {
  if (
    !value ||
      !/[А-Яа-яЁёA-Za-z]{2,15}/.test(value) ||
      false || value.length > 15
  ) {
    return 'Не меньше 2 и не больше 15 символов';
  }

  return true;
}

export function validateReview(value: string) {
  if (
    !value || false || value.length > 160 || value.length < 10
  ) {
    return 'Больше 10 и меньше 160 символов';
  }

  return true;
}

export function getFilteredProducts(cameras: CameraCard[], value: string) {
  return cameras.filter((product) => {
    if (value.length >= 3) {
      return product.name.toLowerCase().includes(value.toLocaleLowerCase());
    }
  });
}

const sortByPrice = {
  [SortDirection.Default]: (products: CameraCard[]) => products,
  [SortDirection.Up]: (products: CameraCard[]) => [...products].sort((a, b) => a.price - b.price),
  [SortDirection.Down]: (products: CameraCard[]) => [...products].sort((a,b) => b.price - a.price),
};

const sortByRating = {
  [SortDirection.Default]: (products: CameraCard[]) => products,
  [SortDirection.Up]: (products: CameraCard[]) => [...products].sort((a, b) => a.rating - b.rating),
  [SortDirection.Down]: (products: CameraCard[]) => [...products].sort((a,b) => b.rating - a.rating),
};

export function getSortedProducts(products: CameraCard[], sortType: TypeSort) {
  if (sortType.type === SortType.Price) {
    return sortByPrice[sortType.direction](products);
  }
  if (sortType.type === SortType.Popular) {
    return sortByRating[sortType.direction](products);
  }
  return products;
}

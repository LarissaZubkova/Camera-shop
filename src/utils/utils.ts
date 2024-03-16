import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DEFAULT_PRODUCTS_COUNT, DateFormat, COUNT_STEP, SortDirection, SortType, CategoryFilterType, FILTER_NAME, FilterType, LevelFilterType, PRODUCT_FILTER_NAME } from '../const';
import { CameraCard } from '../types/product';
import { Review } from '../types/review';

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
  if (pagination === COUNT_STEP) {
    return COUNT_STEP;
  }
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

export function getSortedProducts(products: CameraCard[], sortType: {
  type: string;
  direction: SortDirection;
}): CameraCard[] {
  if (sortType.type === SortType.Price) {
    return sortByPrice[sortType.direction](products);
  }
  if (sortType.direction && sortType.type === SortType.Popular) {
    return sortByRating[sortType.direction](products);
  }
  return products;
}

const categoryFilter = {
  [CategoryFilterType.Photocamera]: (products: CameraCard[]) => products.filter((product) => product.category === PRODUCT_FILTER_NAME.photocamera),
  [CategoryFilterType.Videocamera]: (products: CameraCard[]) => products.filter((product) => product.category === FILTER_NAME.videocamera),
};

const typeFilter = {
  [FilterType.Digital]: (products: CameraCard[]) => products.filter((product) => product.type === FILTER_NAME.digital),
  [FilterType.Film]: (products: CameraCard[]) => products.filter((product) => product.type === FILTER_NAME.film),
  [FilterType.Snapshot]: (products: CameraCard[]) => products.filter((product) => product.type === FILTER_NAME.snapshot),
  [FilterType.Collection]: (products: CameraCard[]) => products.filter((product) => product.type === FILTER_NAME.collection),
};

const levelFilter = {
  [LevelFilterType.Zero]: (products: CameraCard[]) => products.filter((product) => product.level === FILTER_NAME.zero),
  [LevelFilterType.NonProfessional]: (products: CameraCard[]) => products.filter((product) => product.level === FILTER_NAME['non-professional']),
  [LevelFilterType.Professional]: (products: CameraCard[]) => products.filter((product) => product.level === FILTER_NAME.professional),
};

export function getProductsByFilters(
  products: CameraCard[],
  category: CategoryFilterType | null,
  types: FilterType[],
  levels: LevelFilterType[],
  minPrice: number,
  maxPrice: number,
) {
  let filteredProducts = products;

  if (category) {
    filteredProducts = categoryFilter[category](filteredProducts);
  }

  if (types && types.length) {
    filteredProducts = types.map((type) => typeFilter[type](filteredProducts)).flat();
  }

  if (levels && levels.length) {
    filteredProducts = levels.map((level) => levelFilter[level](filteredProducts)).flat();
  }

  if (minPrice && maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }

  return filteredProducts;
}

export const getAllSearchParams = (params: URLSearchParams) => {
  let allParams = {};
  for (const [key, value] of params.entries()) {
    allParams = {...allParams, [key]: value};
  }
  return allParams;
};

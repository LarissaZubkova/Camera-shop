export const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;
export const DEFAULT_PRODUCTS_COUNT = 9;
export const DEFAULT_PAGE_NUMBER = 1;
export const PAGE_STEP = 3;
export const DEFAULT_TAB = 'Описание';
export const SIMILAR_COUNT_STEP = 3;

export enum NameSpace {
    Product = 'PRODUCT',
    Review = 'REVIEW',
}

export enum APIRoute {
    Products = 'cameras',
    Promo = 'promo',
    Reviews = 'cameras/id/reviews'
}

export enum AppRoute {
  Catalog = '/',
  Product = '/product/',
}

export enum ProductTab {
  Property = 'Характеристики',
  Description = 'Описание',
}

export enum DateFormat {
  DateTimeFormat = 'YYYY-MM-DD',
  ReviewDateFormat = 'DD MMMM',
}

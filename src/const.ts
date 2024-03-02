export const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;
export const DEFAULT_PRODUCTS_COUNT = 9;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_TAB = 'Описание';
export const KEY_ESCAPE = 'Escape';
export const COUNT_STEP = 3;
export const SCROLL_MEANING = 50;
export const STAR_COUNT = 5;

export enum NameSpace {
    Product = 'PRODUCT',
    Review = 'REVIEW',
}

export enum APIRoute {
    Products = 'cameras',
    Promo = 'promo',
    Reviews = 'cameras/id/reviews',
    Review = 'reviews',
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

export enum ModalType {
  CatalogAddModal = 'CatalogAddModal',
  AddReviewModal = 'AddReviewModal',
  ReviewSuccessModal = 'ReviewSuccessModal',
  Default = '',
}

export enum SortType {
  Default ='',
  Price = 'sortPrice',
  Popular = 'sortPopular',
}

export enum SortDirection {
  Default = '',
  Up = 'up',
  Down = 'down'
}

export enum PriceFilterType {
  Price = 'price',
  PriceUp = 'priceUp',
}

export enum CategoryFilterType {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

export enum FilterType {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum LevelFilterType {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export enum Filter {
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export const FILTER_NAME = {
  photocamera: 'Фотокамера',
  videocamera: 'Видеокамера',
  digital: 'Цифровая',
  film: 'Плёночная',
  snapshot: 'Моментальная',
  collection: 'Коллекционная',
  zero: 'Нулевой',
  ['non-professional']: 'Любительский',
  professional: 'Профессиональный',
};

export const PRODUCT_FILTER_NAME = {
  photocamera: 'Фотоаппарат',
  videocamera: 'Видеокамера',
  digital: 'Цифровая',
  film: 'Плёночная',
  snapshot: 'Моментальная',
  collection: 'Коллекционная',
  zero: 'Нулевой',
  ['non-professional']: 'Любительский',
  professional: 'Профессиональный',
};

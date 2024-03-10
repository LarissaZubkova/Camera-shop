import { CategoryFilterType } from '../const';

export type Filters = {
  category: CategoryFilterType | string;
  type: string[];
  level: string[];
  minPrice: string;
  maxPrice: string;
};

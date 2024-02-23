import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process/product-process.slice';
import { reviewProcess } from './review-process/review-process.slice';
import { filterSortProcess } from './filter-sort-process/filter-sort-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.FilterSort]: filterSortProcess.reducer,
});

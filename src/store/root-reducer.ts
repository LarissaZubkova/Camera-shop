import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process/product-process.slice';
import { reviewProcess } from './review-process/review-process.slice';
import { filterProcess } from './filter-process/filter-process.slice';
import { basketProcess } from './basket-process/basket-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.Filter]: filterProcess.reducer,
  [NameSpace.Basket]: basketProcess.reducer,
});

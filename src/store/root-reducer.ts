import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productProcess } from './product-process/product-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
});

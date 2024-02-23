import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSortProcess } from '../../types/state';
import { NameSpace, SortDirection, SortType } from '../../const';
import { TypeSort } from '../../types/sort-type';

const initialState: FilterSortProcess = {
  sortType: {
    type: SortType.Default,
    direction: SortDirection.Default,
  }
};

export const filterSortProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<TypeSort>) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = filterSortProcess.actions;

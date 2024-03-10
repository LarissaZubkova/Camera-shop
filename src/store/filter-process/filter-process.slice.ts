import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { CameraCard } from '../../types/product';
import { Filters } from '../../types/filters';

const initialState: FilterProcess = {
  filteredProducts: [],
  filters: {
    category: '',
    type: [],
    level: [],
    minPrice: '',
    maxPrice: '',
  }
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<CameraCard[]>) => {
      state.filteredProducts = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    }
  },
});

export const { setFilteredProducts, setFilters } = filterProcess.actions;

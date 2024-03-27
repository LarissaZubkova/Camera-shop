import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BascetProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: BascetProcess = {
  camerasIds: [],
};

export const bascetProcess = createSlice({
  name: NameSpace.Bascet,
  initialState,
  reducers: {
    setBascetProduct: (state, action: PayloadAction<number>) => {
      state.camerasIds.push(action.payload);
    },
  },
});

export const { setBascetProduct } = bascetProcess.actions;

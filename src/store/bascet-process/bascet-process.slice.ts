import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BascetProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: BascetProcess = {
  basketCameras: {}
};

export const bascetProcess = createSlice({
  name: NameSpace.Bascet,
  initialState,
  reducers: {
    setBascetProduct: (state, action: PayloadAction<{id: number; count: number}>) => {
      const {id, count} = action.payload;
      if ((state.basketCameras[id] + count) > 99) {
        state.basketCameras[id] = 99;
        return;
      }
      if (state.basketCameras[id]) {
        state.basketCameras[id] += count;
      } else {
        state.basketCameras[id] = count;
      }
    },
  },
});

export const { setBascetProduct } = bascetProcess.actions;

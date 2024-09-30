import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';

interface AppSliceState {
  route: number;
  isFirstTime: boolean;
}

const initialState: AppSliceState = {
  route: 0,
  isFirstTime: true,
};

export const appSlice = createSlice({
  name: Slices.app,
  initialState,
  reducers: {
    changeNavigatorRoute: (state, action: PayloadAction<number>) => {
      state.route = action.payload;
      state.isFirstTime = false;
    },
    clearAppSlice: () => initialState,
  },
});

export const {changeNavigatorRoute, clearAppSlice} = appSlice.actions;
export default appSlice.reducer;

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {User} from '../../models/interfaces/api/response/OTPVerificationResponse';

interface AuthSliceState {
  user?: User;
}

const initialState: AuthSliceState = {};

export const authSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    clearAuthSlice: () => initialState,
  },
});

export const {updateUser, clearAuthSlice} = authSlice.actions;
export default authSlice.reducer;

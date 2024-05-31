import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from '../../../models/user';

const initialAuthState: UserData = {
  isAuth: false,
  token: null,
  user: {
    id: '',
    name: '',
    image: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUserData(state, actions: PayloadAction<UserData>) {
      state.isAuth = actions.payload.isAuth;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;

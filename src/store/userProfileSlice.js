// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
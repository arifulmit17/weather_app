// src/redux/features/auth/authSlice.ts
import { tokenManager } from "@/lib/tokenManager.js";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user"),
  token: tokenManager.getAccessToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string | null; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(state)
      if (action.payload.user)
      localStorage.setItem("user", action.payload.user);
      tokenManager.setAccessToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      tokenManager.clearTokens();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

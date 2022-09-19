import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    auth_login: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { auth_login } = userAuthSlice.actions;

export default userAuthSlice.reducer;

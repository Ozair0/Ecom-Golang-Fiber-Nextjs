import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToggleCartState {
  Toggle: boolean;
}

const initialState: ToggleCartState = {
  Toggle: false,
};

export const toggleCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showCart: (state: ToggleCartState, action: PayloadAction<boolean>) => {
      state.Toggle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showCart } = toggleCartSlice.actions;

export default toggleCartSlice.reducer;

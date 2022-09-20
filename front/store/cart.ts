import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemState {
  ID: number;
}

export interface CartState {
  items: [CartItemState?];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: CartState, action: PayloadAction<CartItemState>) => {
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemState {
  ID: number;
  QTY: number;
  price: number;
}

export interface CartState {
  items: [CartItemState?];
  length: number;
  total: number;
}

const initialState: CartState = {
  items: [],
  length: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: CartState, action: PayloadAction<CartItemState>) => {
      if (action.payload.ID !== null) {
        state.length += 1;
        state.total += action.payload.price;
        let found = false;
        state.items.map((item) => {
          if (item?.ID === action.payload.ID) {
            item.QTY += 1;
            found = true;
          }
        });
        if (!found) {
          state.items.push(action.payload);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;

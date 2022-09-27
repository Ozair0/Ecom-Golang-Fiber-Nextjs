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
          state.items.sort(function (a, b) {
            // @ts-ignore
            return a.ID - b.ID || a.title.localeCompare(b.title);
          });
        }
      }
    },
    removeItemFromCart: (state: CartState, action: PayloadAction<number>) => {
      // @ts-ignore
      state.items.map((item, index) => {
        if (item?.ID === action.payload) {
          state.length -= 1;
          state.total -= item.price;
          if (item.QTY > 1) {
            item.QTY -= 1;
          } else {
            // @ts-ignore
            state.items.splice(index, 1);
          }
        }
      });
    },
    deleteItemFromCart: (state: CartState, action: PayloadAction<number>) => {
      // @ts-ignore
      state.items.map((item, index) => {
        if (item?.ID === action.payload) {
          state.length -= item.QTY;
          state.total -= item.price * item.QTY;
          // @ts-ignore
          state.items.splice(index, 1);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

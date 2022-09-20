import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Currency {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  title: string;
  code: string;
}
export interface Categories {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  description: string;
  Product: any;
}
export interface Store {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  name: string;
  location: string;
  Product: any;
  Cart: any;
  Order: any;
}
export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  firstname: string;
  lastname: string;
  email: string;
}

export interface ProductState {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  title: string;
  description: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  price: number;
  additionalPrice: number;
  image: string;
  QTY: number;
  UserID: number;
  StoreID: number;
  CategoriesID: number;
  CurrencyID: number;
  Currency: Currency;
  Categories: Categories;
  Store: Store;
  User: User;
}

export interface ProductsState {
  products: [ProductState?];
}

const initialState: ProductsState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (
      state: ProductsState,
      action: PayloadAction<[ProductState]>
    ) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProducts } = productSlice.actions;

export default productSlice.reducer;

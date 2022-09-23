import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import cartReducer from "./reducers/cart.reducer";

export const CART_KEY_IN_STORE = "cart";

export const cartSlice: Slice = createSlice({
  name: CART_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...cartReducer,
  },
});

export const {
  //? ********************| FETCH CART ACTIONS |*******************/
  fetchCart,
  fetchCartSuccess,
  fetchCartFailure,

  //? ********************| ADD CART ACTIONS |*******************/
  addCart,
  addCartSuccess,
  addCartFailure,

  //? ********************| UPDATE BY QUANTITY CART ACTIONS |*******************/
  updateByQuantityCart,
  updateByQuantityCartSuccess,
  updateByQuantityCartFailure,

  //? ********************| DETAILS CART ACTIONS |*******************/
  detailsCart,
  detailsCartSuccess,
  detailsCartFailure,

  //? ********************| DETAILS CART ACTIONS |*******************/
  deleteCart,
  deleteCartSuccess,
  deleteCartFailure,

  resetCart,
} = cartSlice.actions;

//? ********************| COMMENTS OFFER SELECTORS |*******************/
export const loadingCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.loading;
export const entityCart = (state: any) => state[CART_KEY_IN_STORE].cart.entity;
export const loadingEntitiesCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.loadingEntities;
export const entitiesCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.entities;
export const totalItemsCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.totalItems;
export const totalPagesCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.totalPages;
export const deleteSuccessCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.deleteSuccess;
export const addSuccessCart = (state: any) =>
  state[CART_KEY_IN_STORE].cart.addSuccess;

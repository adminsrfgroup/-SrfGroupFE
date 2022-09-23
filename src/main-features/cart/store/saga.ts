import { all, takeEvery } from "redux-saga/effects";
import {
  fetchCart,
  addCart,
  updateByQuantityCart,
  detailsCart,
  deleteCart,
} from "./slice";
import {
  addCartHandler,
  deleteCartHandler,
  detailsCartHandler,
  fetchCartHandler,
  updateByQuantityCartHandler,
} from "./saga-handler/cart.generator";

export function* cartSaga() {
  yield all([
    takeEvery(fetchCart, fetchCartHandler),
    takeEvery(addCart, addCartHandler),
    takeEvery(updateByQuantityCart, updateByQuantityCartHandler),
    takeEvery(detailsCart, detailsCartHandler),
    takeEvery(deleteCart, deleteCartHandler),
  ]);
}

export default cartSaga;

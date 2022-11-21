import { all, takeEvery } from "redux-saga/effects";
import {
  fetchCart,
  addCart,
  updateByQuantityCart,
  detailsCart,
  deleteCart,
  addOrder,
  fetchPassedOrder,
  fetchReceivedOrder
} from "./slice";
import {
  addCartHandler,
  deleteCartHandler,
  detailsCartHandler,
  fetchCartHandler,
  updateByQuantityCartHandler,
} from "./saga-handler/cart.generator";
import {addOrderHandler, fetchPassedOrderHandler, fetchReceivedOrderHandler} from "./saga-handler/order.generator";

export function* cartSaga() {
  yield all([
    takeEvery(fetchCart, fetchCartHandler),
    takeEvery(addCart, addCartHandler),
    takeEvery(updateByQuantityCart, updateByQuantityCartHandler),
    takeEvery(detailsCart, detailsCartHandler),
    takeEvery(deleteCart, deleteCartHandler),
    takeEvery(addOrder, addOrderHandler),
    takeEvery(fetchPassedOrder, fetchPassedOrderHandler),
    takeEvery(fetchReceivedOrder, fetchReceivedOrderHandler),
  ]);
}

export default cartSaga;

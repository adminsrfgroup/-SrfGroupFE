import {all, takeEvery} from "redux-saga/effects";
import { addRentRequests, fetchRentRequestsSent, fetchRentRequestsReceived } from "./slice";
import {
    addRentRequestsHandler,
    fetchRentRequestsReceivedHandler,
    fetchRentRequestsSentHandler
} from "./saga-handler/rent_request.generator";


export function* rentRequestSaga() {
    yield all([
        takeEvery(addRentRequests, addRentRequestsHandler),
        takeEvery(fetchRentRequestsSent, fetchRentRequestsSentHandler),
        takeEvery(fetchRentRequestsReceived, fetchRentRequestsReceivedHandler),
    ]);
}

export default rentRequestSaga;

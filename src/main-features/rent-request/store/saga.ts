import {all, takeEvery} from "redux-saga/effects";
import { addRentRequests, fetchRentRequestsSent, fetchRentRequestsReceived, deleteRentRequestsSent } from "./slice";
import {
    addRentRequestsHandler, deleteRentRequestsSentHandler,
    fetchRentRequestsReceivedHandler,
    fetchRentRequestsSentHandler
} from "./saga-handler/rent_request.generator";


export function* rentRequestSaga() {
    yield all([
        takeEvery(addRentRequests, addRentRequestsHandler),
        takeEvery(fetchRentRequestsSent, fetchRentRequestsSentHandler),
        takeEvery(fetchRentRequestsReceived, fetchRentRequestsReceivedHandler),
        takeEvery(deleteRentRequestsSent, deleteRentRequestsSentHandler),
    ]);
}

export default rentRequestSaga;

import {invokeWS, MethodHttp} from "../../../../core/config/api-service";
import {put} from "redux-saga/effects";
import {addRentRequestsFailure, addRentRequestsSuccess, fetchRentRequestsFailureReceived, fetchRentRequestsFailureSent,
    fetchRentRequestsSuccessReceived, fetchRentRequestsSuccessSent } from "../slice";


const apiUrl = "api/rentrequest";

export function* addRentRequestsHandler(data: any): Generator<any, any, any> {
    try {
        const result = yield invokeWS(
            {
                url: `${apiUrl}/create`,
                method: MethodHttp.post,
            },
            {
                ...data.payload,
            }
        );
        yield put(addRentRequestsSuccess(result?.data?.content));
    } catch (e) {
        console.error(e);
        yield put(addRentRequestsFailure(e));
    }
}

export function* fetchRentRequestsSentHandler(
    data: any
): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/current-user/sent?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchRentRequestsSuccessSent(result?.data));
    } catch (e) {
        console.error(e);
        yield put(fetchRentRequestsFailureSent(e));
    }
}


export function* fetchRentRequestsReceivedHandler(
    data: any
): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/current-user/received?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchRentRequestsSuccessReceived(result?.data));
    } catch (e) {
        console.error(e);
        yield put(fetchRentRequestsFailureReceived(e));
    }
}

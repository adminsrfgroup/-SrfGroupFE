import { invokeWS, MethodHttp } from '../../../../core/config/api-service';
import { put } from 'redux-saga/effects';
import {
    addOrderSuccess,
    addOrderFailure,
    fetchPassedOrderSuccess,
    fetchPassedOrderFailure,
    fetchReceivedOrderSuccess,
    fetchReceivedOrderFailure,
} from '../slice';

const apiUrl = 'api/order';

export function* addOrderHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/create`;
        const result = yield invokeWS(
            {
                url: `${requestUrl}`,
                method: MethodHttp.post,
            },
            {
                ...data.payload,
            }
        );
        yield put(addOrderSuccess(result?.data));
    } catch (e) {
        yield put(addOrderFailure(e));
    }
}

export function* fetchPassedOrderHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/current-user/passed?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchPassedOrderSuccess(result?.data));
    } catch (e) {
        yield put(fetchPassedOrderFailure(e));
    }
}

export function* fetchReceivedOrderHandler(
    data: any
): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/current-user/received?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchReceivedOrderSuccess(result?.data));
    } catch (e) {
        yield put(fetchReceivedOrderFailure(e));
    }
}

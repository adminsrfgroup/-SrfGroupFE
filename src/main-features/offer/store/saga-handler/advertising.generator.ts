import {invokeWS, MethodHttp} from "../../../../core/config/api-service";
import {put} from "redux-saga/effects";
import {fetchAdvertisingFailure, fetchAdvertisingSuccess } from "../slice";

const apiUrl = "api/advertising-per-period";

export function* fetchAdvertisingHandler(): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/public/advertising-search`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchAdvertisingSuccess(result?.data));
    } catch (e) {
        yield put(fetchAdvertisingFailure(e));
    }
}

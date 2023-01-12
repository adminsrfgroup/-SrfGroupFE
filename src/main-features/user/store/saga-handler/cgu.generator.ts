import { put } from 'redux-saga/effects';
import { fetchCguFailure, fetchCguSuccess } from '../slice';
import { invokeWS, MethodHttp } from '../../../../core/config/api-service';

const apiUrl = 'api/cgu';

export function* fetchCguHandler(): Generator<any, any, any> {
	try {
		const requestUrl = `${apiUrl}/public`;
		const result = yield invokeWS({
			url: `${requestUrl}`,
			method: MethodHttp.get,
		});
		yield put(fetchCguSuccess(result?.data));
	} catch (e) {
		console.error(e);
		yield put(fetchCguFailure(e));
	}
}

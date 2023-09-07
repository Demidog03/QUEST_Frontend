import { call, put, takeLeading } from 'redux-saga/effects';
import { AuthActionTypes, LoginAction, LoginTokenAction } from '../../types/auth.ts'
import {getLevel, getLevelSuccess, loginSuccess} from './authSlice.ts'
import { loginUser as loginUserApi, loginTokenUser as loginTokenUserApi, getLevel as getLevelApi } from '../../../api/auth'

// fetchPosts worker
export function* loginSaga(action: LoginAction) {
  try {
    const { data } = yield call(loginUserApi, action.payload)
    yield put(loginSuccess({ user: data.user_data, accessToken: data.user_data.access, refreshToken: data.user_data.refresh }));
    localStorage.setItem("accessToken", data.user_data.access)
    localStorage.setItem("refreshToken", data.user_data.refresh)
  } catch {}
}

export function* loginTokenSaga(action: LoginTokenAction) {
  try{
    const { data } = yield call(loginTokenUserApi, action.payload)
    yield put(loginSuccess({ user: data.user_data, accessToken: data.user_data.access, refreshToken: data.user_data.refresh }));
  } catch {}
}

export function* getLevelSaga(action: any) {
  try{
    const { data } = yield call(getLevelApi, action.payload)
    yield put(getLevelSuccess({ xp: data.xp, level: data.level }));
  } catch {}
}

// post watcher
function* authSaga() {
  yield takeLeading(AuthActionTypes.LOGIN, loginSaga);
  yield takeLeading(AuthActionTypes.LOGIN_TOKEN, loginTokenSaga);
  yield takeLeading(getLevel.type, getLevelSaga);
}

export default authSaga;

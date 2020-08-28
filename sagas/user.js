import { call, fork, takeLatest, delay, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { Result } from 'antd';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
} from '../reducers/user';

// login
// function logInAPI(data) {
//   return axios.post("/api/login", data);
// }

function* logIn(action) {
  yield delay(1000);
  try {
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: action.data, // 더미데이터를 위해서 action.data를 씀.
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

// logout
// function logOutAPI() {
//   return axios.post("/api/logout");
// }

function* logOut(action) {
  yield delay(1000);
  try {
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      //   data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// signup
// function signUpAPI() {
//   return axios.post("/api/signup");
// }

function* signUp(action) {
  yield delay(1000);
  try {
    // const result = yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
      //   data: result.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchSignUp)]);
}

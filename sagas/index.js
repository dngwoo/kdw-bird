import { all, fork, call, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";

// login
// function logInAPI(data) {
//   return axios.post("/api/login", data);
// }

function* logIn(action) {
  yield delay(1000);
  try {
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: "LOG_IN_SUCCESS",
      //   data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

// logout
// function logOutAPI() {
//   return axios.post("/api/logout");
// }

function* logOut() {
  yield delay(1000);
  try {
    // const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

// addPost
// function addPostAPI(data) {
//   return axios.post("/api/post", data);
// }

function* addPost(action) {
  yield delay(1000);
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: "ADD_POST_SUCCESS",
      //   data: result.data,
    });
  } catch (error) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

// saga사용방법
// 비동기 액션들을 rootSaga안에 집어넣는다.
export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}

// all은 배열을 받고 배열안에 있는 모든 비동기 액션들을 실행시켜준다.
// fork 는 함수를 실행하는 것이다. 비동기 함수 호출 <- axios 로직이 들어있는 function을 인자로 주게되면 axios 가 끝날때까지 기다려주지 않는다.
// call 은 함수를 실행하는 것이다. 동기 함수 호출 <- axios 로직이 들어있는 function을 인자로 주게되면 axios 가 끝날때까지 기다려준다.
// take("LOG_IN")이라는 것은 LOG_IN이라는 액션이 실행되기전까지 기다리겠다 라는 뜻이다.
// put은 dsipatch 이다. 인자로 action을 받는다.

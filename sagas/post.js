import { call, fork, takeLatest, delay, put, all } from "redux-saga/effects";
import axios from "axios";

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

export default function* postSaga() {
  yield all[fork(watchAddPost)];
}

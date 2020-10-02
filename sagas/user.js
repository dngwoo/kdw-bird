import { call, fork, takeLatest, delay, put, all } from 'redux-saga/effects';
import axios from 'axios';
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
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  FOLLOW_REQUEST,
  LOAD_MY_INFO_REQUEST, 
  LOAD_MY_INFO_SUCCESS, 
  LOAD_MY_INFO_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE
} from '../reducers/user';

//changeNickname
function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', {nickname: data}); // req.body.nickname으로 실리게 된다
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data); // nickname
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data, 
    });
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: error.response.data
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

//loadMyInfo
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    console.log(result);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data, 
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}


//login
function logInAPI(data) {
  return axios.post('/user/login', data); // data에 이메일과 패스워드가 들어있음.
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data, 
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

// logout
function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  yield delay(1000);
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// signup
function signUpAPI(data) {
  return axios.post('/user', data); // data가 백엔드에 req.body에 실려서 감.
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error.response.data);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// unFollow
// function unFollowAPI() {
//   return axios.post("/api/unFollow");
// }

function* unFollow(action) {
  yield delay(1000);
  try {
    // const result = yield call(unFollowAPI);
    yield put({
      type: UNFOLLOW_SUCCESS,
        data: action.data, // post.User.id
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

// follow
function* follow(action) {
  yield delay(1000);
  try {
    // const result = yield call(followAPI);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data, // post.User.id
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

export default function* userSaga() {
  yield all(
    [
      fork(watchChangeNickname),
      fork(watchLoadMyInfo),
      fork(watchFollow),
      fork(watchUnFollow),
      fork(watchLogin), 
      fork(watchLogOut), 
      fork(watchSignUp)
    ]);
}

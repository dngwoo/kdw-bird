import { call, fork, takeLatest, delay, put, all, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
  LOAD_POSTS_REQUEST,
} from '../reducers/post';
import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortId from 'shortid';

// addPost
// function addPostAPI(data) {
//   return axios.post("/api/post", data);
// }

function* addPost(action) {
  yield delay(1000);
  const id = shortId.generate();
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      //   data: result.data,
      data: {
        id,
        content: action.data
      }
    });

    yield put({
      type: ADD_POST_TO_ME,
      data: id
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// addComment
// function addCommentAPI(data) {
//   return axios.post(`/api/post/${data.postId}/comment`, data);
// }

function* addComment(action) {
  yield delay(1000);
  try {
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      //   data: result.data,
      data: action.data
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// reomvePost
// function reomveAPI(data) {
//   return axios.post(`/api/post/${data.postId}/comment`, data);
// }

function* removePost(action) {
  yield delay(1000);

  // PostCard 갯수 줄이기
  try {
    // const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      //   data: result.data,
      data: action.data // 어떤 데이터가 지워지는지에 대한 id 값
    });

    // userProfile.js에서 짹짹 갯수 줄이기
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data // 어떤 데이터가 지워지는지에 대한 id 값
    });

  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}


function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// reomveComment
// function reomveAPI(data) {
//   return axios.post(`/api/post/${data.postId}/comment`, data);
// }

function* removeComment(action) {
  yield delay(1000);
  try {
    // const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      //   data: result.data,
      data: action.data // 어떤 데이터가 지워지는지에 대한 id 값
    });

  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_POST_REQUEST, removeComment);
}

// loadPost
// function loadPostsAPI(data) {
//   return axios.post(`/api/posts`, data);
// }

function* loadPosts(action) {
  yield delay(1000);
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10)
    });

  } catch (error) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}


export default function* postSaga() {
  yield all(
    [
      fork(watchLoadPosts), 
      fork(watchAddPost), 
      fork(watchAddComment), 
      fork(watchRemovePost), 
      fork(watchRemoveComment)
    ]
  );
}

import { call, fork, takeLatest, put, all, throttle } from 'redux-saga/effects';
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
  LOAD_POSTS_REQUEST,
  LIKE_POST_REQUEST, 
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, 
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE, 
  REMOVE_COMMENT_REQUEST, 
  REMOVE_COMMENT_SUCCESS, 
  REMOVE_COMMENT_FAILURE
} from '../reducers/post';
import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// likePost
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`); // patch는 일부분 수정할 때 사용
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data // { PostId: post.id, UserId: req.user.id }
    });
  } catch (error) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// unlikePost
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);  // /post/1/like
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data); // post.id를 받아옴
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data // { PostId: post.id, UserId: req.user.id }
    });
  } catch (error) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

// addPost
function addPostAPI(data) {
  return axios.post('/post', {content: data});
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });

    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// addComment
function addCommentAPI(data) {
  // Post /post/1/comment <- 1번 포스트에 댓글을 다는구나 라는것을 알게끔 만들어주는것이 좋다.
  return axios.post(`/post/${data.postId}/comment`, data); // {content: contentText, postId: post.id, userId: id}
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// reomvePost
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  // PostCard 갯수 줄이기
  try {
    const result = yield call(removePostAPI, action.data); // post.id
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data // 어떤 데이터가 지워지는지에 대한 post의 id 값
    });

    // userProfile.js에서 짹짹 갯수 줄이기
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data // 어떤 데이터가 지워지는지에 대한 post의 id 값
    });

  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
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

// function* removeComment(action) {
//   yield delay(1000);
//   try {
//     // const result = yield call(removePostAPI, action.data);
//     yield put({
//       type: REMOVE_COMMENT_SUCCESS,
//       //   data: result.data,
//       data: action.data // 어떤 데이터가 지워지는지에 대한 id 값
//     });

//   } catch (error) {
//     yield put({
//       type: REMOVE_COMMENT_FAILURE,
//       error: error.response.data,
//     });
//   }
// }

// function* watchRemoveComment() {
//   yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
// }

// loadPost
function loadPostsAPI() {
  return axios.get('/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });

  } catch (error) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}


export default function* postSaga() {
  yield all(
    [
      fork(watchLikePost), 
      fork(watchUnlikePost), 
      fork(watchLoadPosts), 
      fork(watchAddPost), 
      fork(watchAddComment), 
      fork(watchRemovePost), 
      // fork(watchRemoveComment)
    ]
  );
}

import { all, fork } from 'redux-saga/effects';
import UserSaga from './user';
import PostSaga from './post';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065'; // axios 기본 url 설정
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(UserSaga), fork(PostSaga)]);
}

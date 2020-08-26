import { all, fork } from "redux-saga/effects";
import UserSaga from "./user";
import PostSaga from "./post";

export default function* rootSaga() {
  yield all([fork(UserSaga), fork(PostSaga)]);
}

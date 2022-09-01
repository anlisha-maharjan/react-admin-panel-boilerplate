import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import mediaSagas from "./media/saga";
import userSagas from "./user/saga";
export default function* rootSaga(getState) {
  yield all([authSagas(), mediaSagas(), userSagas()]);
}

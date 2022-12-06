import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { GET_SINGLE_CONFIG_CHOICE, GET_MULTIPLE_CONFIG_CHOICE, GET_MODULE, GET_PERMISSION } from "reduxs/actions";
import {
  getSingleConfigChoiceSuccess,
  getSingleConfigChoiceError,
  getMultipleConfigChoiceSuccess,
  getMultipleConfigChoiceError,
  getModuleSuccess,
  getModuleError,
  getPermissionSuccess,
  getPermissionError,
} from "./action";
import SharedService from "services/SharedService";
import { toaster, parseMessage, handleResponseErrorMessage } from "helpers";

const getUser = (state) => state.auth.user;

export function* watchGetSingleConfigChoice() {
  yield takeEvery(GET_SINGLE_CONFIG_CHOICE, getSingleConfigChoice);
}

const getSingleConfigChoiceAsync = async (category) => {
  return SharedService.getSingleConfigChoice(category);
};

function* getSingleConfigChoice({ payload }) {
  try {
    const response = yield call(getSingleConfigChoiceAsync, payload.category);
    if (response.data.success) {
      yield put(getSingleConfigChoiceSuccess(response.data.data));
    } else {
      yield put(getSingleConfigChoiceError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(error);
    toaster("error", errMessage);
    yield put(getSingleConfigChoiceError(errMessage));
  }
}

export function* watchGetMultipleConfigChoice() {
  yield takeEvery(GET_MULTIPLE_CONFIG_CHOICE, getMultipleConfigChoice);
}

const getMultipleConfigChoiceAsync = async (categories) => {
  return SharedService.getMultipleConfigChoice(categories);
};

function* getMultipleConfigChoice({ payload }) {
  try {
    const response = yield call(getMultipleConfigChoiceAsync, payload.categories);
    if (response.data.success) {
      yield put(getMultipleConfigChoiceSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getMultipleConfigChoiceError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(getMultipleConfigChoiceError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetModule() {
  yield takeEvery(GET_MODULE, getModule);
}

const getModuleAsync = async () => {
  return SharedService.getModule();
};

function* getModule() {
  try {
    const response = yield call(getModuleAsync);
    if (response.data.success) {
      yield put(getModuleSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getModuleError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(getModuleError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetPermission() {
  yield takeEvery(GET_PERMISSION, getPermission);
}

const getPermissionAsync = async (role) => {
  return SharedService.getPermission(role);
};

function* getPermission() {
  const currentUser = yield select(getUser);
  try {
    const response = yield call(getPermissionAsync, currentUser.role);
    if (response.data.success) {
      yield put(getPermissionSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getPermissionError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(getPermissionError(errMessage));
    toaster("error", errMessage);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetSingleConfigChoice),
    fork(watchGetMultipleConfigChoice),
    fork(watchGetModule),
    fork(watchGetPermission),
  ]);
}

import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_USER,
  GET_USER_LIST,
  ADD_USER,
  GET_USER,
  EDIT_USER,
  RESEND_VERIFICATION_CODE,
  DELETE_USER,
} from "reduxs/actions";
import {
  getAllUserSuccess,
  getAllUserError,
  getUserList,
  getUserListSuccess,
  getUserListError,
  addUserSuccess,
  addUserError,
  getUser,
  getUserSuccess,
  getUserError,
  editUserSuccess,
  editUserError,
  resendVerificationCodeSuccess,
  resendVerificationCodeError,
  deleteUserSuccess,
  deleteUserError,
} from "./action";
import { toaster, parseMessage, handleResponseErrorMessage } from "helpers";
import UserService from "services/UserService";
import TableDataService from "services/TableDataService";

const getMetaData = (state) => state.user.metaData;

export function* watchGetAllUser() {
  yield takeEvery(GET_ALL_USER, getAllUser);
}

const getAllUserAsync = async () => {
  return UserService.getAllUser();
};

function* getAllUser() {
  try {
    const response = yield call(getAllUserAsync);
    if (response.data.success) {
      yield put(getAllUserSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getAllUserError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(error);
    yield put(getAllUserError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetUserList() {
  yield takeEvery(GET_USER_LIST, getUserListAc);
}

const getUserListAsync = async (dbParam) => {
  return TableDataService.getAllData("users", dbParam);
};

function* getUserListAc({ payload }) {
  try {
    const response = yield call(getUserListAsync, payload.dbParam);
    if (response.data.success) {
      yield put(getUserListSuccess(response.data.data, response.data.meta));
    } else {
      toaster("", response.data.message);
      yield put(getUserListError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(error);
    yield put(getUserListError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchAddUser() {
  yield takeEvery(ADD_USER, addUser);
}

const addUserAsync = async (data) => {
  return UserService.addUser(data);
};

function* addUser({ payload }) {
  const { navigate } = payload;
  try {
    const response = yield call(addUserAsync, payload.userData);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(addUserSuccess(response.data.success));
      navigate(`/user-management/${payload.userData?.route || "user"}`);
    } else {
      toaster("", response.data.message);
      yield put(addUserError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(addUserError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUserAc);
}

const getUserAsync = async (id) => {
  return UserService.getUser(id);
};

function* getUserAc({ payload }) {
  try {
    const response = yield call(getUserAsync, payload.userId);
    if (response.data.success) {
      yield put(getUserSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getUserError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(getUserError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, editUser);
}

const editUserAsync = async (data, id) => {
  return UserService.editUser(data, id);
};

function* editUser({ payload }) {
  const { navigate } = payload;
  try {
    const response = yield call(editUserAsync, payload.userData, payload.userId);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(editUserSuccess(response.data.success));
      if (navigate) navigate(`/user-management/${payload.userData?.route || "user"}`);
      if (payload.userData?.route === "profile") {
        if (response.data?.data?.id) {
          const obj = {
            email: response.data?.data?.email || "",
            id: response.data.data.id || "",
            media: response.data?.data?.media || [],
            name: response.data?.data?.name || "",
            role: response.data?.data?.role || "",
          };
          localStorage.setItem("currentUser", JSON.stringify(obj));
          yield put(getUser(response.data.data.id));
        }
      }
    } else {
      toaster("", response.data.message);
      yield put(editUserError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(editUserError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchResendVerificationCode() {
  yield takeEvery(RESEND_VERIFICATION_CODE, resendVerificationCode);
}

const resendVerificationCodeAsync = async (id) => {
  return UserService.resendVerificationCode(id);
};

function* resendVerificationCode({ payload }) {
  try {
    const response = yield call(resendVerificationCodeAsync, payload.userId);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(resendVerificationCodeSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      yield put(resendVerificationCodeError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(resendVerificationCodeError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

const deleteUserAsync = async (id) => {
  return UserService.deleteUser(id);
};

function* deleteUser({ payload }) {
  try {
    const metaData = yield select(getMetaData);
    const response = yield call(deleteUserAsync, payload.userId);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(deleteUserSuccess(response.data.success));
      yield put(getUserList({ page: metaData.page, pageSize: metaData.pageSize }));
    } else {
      toaster("", response.data.message);
      yield put(deleteUserError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(deleteUserError(errMessage));
    toaster("error", errMessage);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllUser),
    fork(watchGetUserList),
    fork(watchAddUser),
    fork(watchGetUser),
    fork(watchEditUser),
    fork(watchResendVerificationCode),
    fork(watchDeleteUser),
  ]);
}

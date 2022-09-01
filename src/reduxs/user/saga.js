import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import UserService from "src/services/user-service";
import TableDataService from "src/services/table-data-service";
import {
  GET_ALL_USER,
  GET_USER_LIST,
  ADD_USER,
  GET_USER,
  EDIT_USER,
  DELETE_USER,
  DELETE_MULTIPLE_USER,
} from "src/reduxs/actions";
import {
  getAllUserSuccess,
  getAllUserError,
  getUserList,
  getUserListSuccess,
  getUserListError,
  addUserSuccess,
  addUserError,
  getUserSuccess,
  getUserError,
  editUserSuccess,
  editUserError,
  deleteUserSuccess,
  deleteUserError,
  deleteMultipleUserSuccess,
  deleteMultipleUserError,
} from "./action";
import { toast } from "react-toastify";
import { parseMessage } from "src/helpers/util";
import ToastElement from "src/components/toast";

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
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(getAllUserError(response.data.message));
    }
  } catch (error) {
    toast.error(<ToastElement type="error" message={error.response.data.message} />, { containerId: "default" });
    yield put(getAllUserError(error.response.data.message));
  }
}

export function* watchGetUserList() {
  yield takeEvery(GET_USER_LIST, getUserListAc);
}

const getUserListAsync = async (dbParam) => {
  return TableDataService.getAllData(
    "users",
    dbParam?.search || "",
    dbParam?.searchFields || "",
    dbParam?.sortOrder || "",
    dbParam?.page || 1,
    dbParam?.pageSize || 10,
    dbParam?.activeCol || ""
  );
};

function* getUserListAc({ payload }) {
  try {
    const response = yield call(getUserListAsync, payload.dbParam);
    if (response.data.success) {
      yield put(getUserListSuccess(response.data));
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(getUserListError(response.data.message));
    }
  } catch (error) {
    toast.error(<ToastElement type="error" message={error.response.data.message} />, { containerId: "default" });
    yield put(getUserListError(error.response.data.message));
  }
}

export function* watchAddUser() {
  yield takeEvery(ADD_USER, addUser);
}

const addUserAsync = async (data) => {
  return UserService.addUser(data);
};

function* addUser({ payload }) {
  const { history } = payload;
  try {
    const response = yield call(addUserAsync, payload.userData);
    if (response.data.success) {
      toast.success(<ToastElement type="success" message={response.data.message} />, { containerId: "default" });
      yield put(addUserSuccess(response.data.success, response.data.message));
      history.push(`/user`);
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(addUserError(response.data.message));
    }
  } catch (error) {
    toast.error(
      <ToastElement
        type="error"
        message={parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message)}
      />,
      {
        containerId: "default",
      }
    );
    yield put(addUserError(error.response.data.message));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUser);
}

const getUserAsync = async (id) => {
  return UserService.getUser(id);
};

function* getUser({ payload }) {
  try {
    const response = yield call(getUserAsync, payload.userId);
    if (response.data.success) {
      yield put(getUserSuccess(response.data.data));
      if (payload.setLocalStorage) {
        if (response.data.data?.id) {
          let obj = {
            id: response.data.data.id,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            role: response.data.data.role?.name,
            roleId: response.data.data.roleId,
            phone: response.data.data.phone,
            address: response.data.data.address,
            customerId: response.data.data.customerId,
            patron: response.data.data.patron,
          };
          localStorage.setItem("currentUser", JSON.stringify(obj));
        }
      }
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(getUserError(response.data.message));
    }
  } catch (error) {
    toast.error(<ToastElement type="error" message={error.response.data.message} />, { containerId: "default" });
    yield put(getUserError(error.response.data.message));
  }
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, editUser);
}

const editUserAsync = async (data, id) => {
  return UserService.editUser(data, id);
};

function* editUser({ payload }) {
  try {
    const response = yield call(editUserAsync, payload.userData, payload.userId);
    if (response.data.success) {
      toast.success(<ToastElement type="success" message={response.data.message} />, {
        containerId: "default",
        autoClose: 12000,
      });
      yield put(editUserSuccess(response.data.success, response.data.message));
      payload?.history?.push(`/user`);
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(editUserError(response.data.message));
    }
  } catch (error) {
    toast.error(
      <ToastElement
        type="error"
        message={parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message)}
      />,
      { containerId: "default" }
    );
    yield put(editUserError(error.response.data.message));
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
    const response = yield call(deleteUserAsync, payload.userId);
    if (response.data.success) {
      toast.success(<ToastElement type="success" message={response.data.message} />, { containerId: "default" });
      yield put(deleteUserSuccess(response.data.success, response.data.message));
      // Fetch updated user list
      yield put(getUserList({}));
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(deleteUserError(response.data.message));
    }
  } catch (error) {
    toast.error(<ToastElement type="error" message={error.response.data.message} />, { containerId: "default" });
    yield put(deleteUserError(error.response.data.message));
  }
}

export function* watchDeleteMultipleUser() {
  yield takeEvery(DELETE_MULTIPLE_USER, deleteMultipleUser);
}

const deleteMultipleUserAsync = async (ids) => {
  return UserService.deleteMultipleUser(ids);
};

function* deleteMultipleUser({ payload }) {
  try {
    const response = yield call(deleteMultipleUserAsync, payload.userIds);
    if (response.data.success) {
      toast.success(<ToastElement type="success" message={response.data.message} />, { containerId: "default" });
      yield put(deleteMultipleUserSuccess(response.data.success, response.data.message));
      // Fetch updated user list
      yield put(getUserList({}));
    } else {
      toast.error(<ToastElement type="error" message={response.data.message} />, { containerId: "default" });
      yield put(deleteMultipleUserError(response.data.message));
    }
  } catch (error) {
    toast.error(<ToastElement type="error" message={error.response.data.message} />, { containerId: "default" });
    yield put(deleteMultipleUserError(error.response.data.message));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllUser),
    fork(watchGetUserList),
    fork(watchAddUser),
    fork(watchGetUser),
    fork(watchEditUser),
    fork(watchDeleteUser),
    fork(watchDeleteMultipleUser),
  ]);
}

import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { GET_ALL_ROLE, GET_ROLE_LIST, ADD_ROLE, GET_ROLE, EDIT_ROLE, DELETE_ROLE } from "../actions";
import {
  getAllRoleSuccess,
  getAllRoleError,
  getRoleList,
  getRoleListSuccess,
  getRoleListError,
  addRoleSuccess,
  addRoleError,
  getRoleSuccess,
  getRoleError,
  editRoleSuccess,
  editRoleError,
  deleteRoleSuccess,
  deleteRoleError,
} from "./action";
import { toaster, parseMessage, handleResponseErrorMessage } from "helpers";
import RoleService from "services/RoleService";
import TableDataService from "services/TableDataService";

const getMetaData = (state) => state.role.metaData;

export function* watchgetAllRole() {
  yield takeEvery(GET_ALL_ROLE, getAllRole);
}

const getAllRoleAsync = async () => {
  return RoleService.getAllRole();
};

function* getAllRole() {
  try {
    const response = yield call(getAllRoleAsync);
    if (response.data) {
      yield put(getAllRoleSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getAllRoleError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(error);
    yield put(getAllRoleError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetRoleList() {
  yield takeEvery(GET_ROLE_LIST, getRoleListAc);
}

const getRoleListAsync = async (dbParam) => {
  return TableDataService.getAllData("roles", dbParam);
};

function* getRoleListAc({ payload }) {
  try {
    const response = yield call(getRoleListAsync, payload.dbParam);
    if (response.data.success) {
      yield put(getRoleListSuccess(response.data.data, response.data.meta));
    } else {
      toaster("", response.data.message);
      yield put(getRoleListError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(error);
    yield put(getRoleListError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchAddRole() {
  yield takeEvery(ADD_ROLE, addRole);
}

const addRoleAsync = async (data) => {
  return RoleService.addRole(data);
};

function* addRole({ payload }) {
  const { navigate } = payload;
  try {
    const response = yield call(addRoleAsync, payload.roleData);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(addRoleSuccess(response.data.success));
      navigate(`/user-management/role`);
    } else {
      toaster("", response.data.message);
      yield put(addRoleError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(addRoleError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchGetRole() {
  yield takeEvery(GET_ROLE, getRole);
}

const getRoleAsync = async (id) => {
  return RoleService.getRole(id);
};

function* getRole({ payload }) {
  try {
    const response = yield call(getRoleAsync, payload.roleId);
    if (response.data.success) {
      yield put(getRoleSuccess(response.data.data));
    } else {
      toaster("", response.data.message);
      yield put(getRoleError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(getRoleError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchEditRole() {
  yield takeEvery(EDIT_ROLE, editRole);
}

const editRoleAsync = async (data, id) => {
  return RoleService.editRole(data, id);
};

function* editRole({ payload }) {
  const { navigate } = payload;
  try {
    const response = yield call(editRoleAsync, payload.roleData, payload.roleId);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(editRoleSuccess(response.data.success));
      navigate(`/user-management/role`);
    } else {
      toaster("", response.data.message);
      yield put(editSRoleError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(editRoleError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchDeleteRole() {
  yield takeEvery(DELETE_ROLE, deleteRole);
}

const deleteRoleAsync = async (id) => {
  return RoleService.deleteRole(id);
};

function* deleteRole({ payload }) {
  try {
    const metaData = yield select(getMetaData);
    const response = yield call(deleteRoleAsync, payload.roleId);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(deleteRoleSuccess(response.data.success));
      yield put(getRoleList({ page: metaData.page, pageSize: metaData.pageSize }));
    } else {
      toaster("", response.data.message);
      yield put(deleteRoleError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(deleteRoleError(errMessage));
    toaster("error", errMessage);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchgetAllRole),
    fork(watchGetRoleList),
    fork(watchAddRole),
    fork(watchGetRole),
    fork(watchEditRole),
    fork(watchDeleteRole),
  ]);
}

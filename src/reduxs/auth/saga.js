import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import AuthService from "services/AuthService";
import {
  REGISTER,
  VERIFY_USER,
  INITIAL_CHANGE_PASSWORD,
  LOGIN,
  FORGOT_PASSWORD,
  VERIFY_RESET_TOKEN,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  CHANGE_PASSWORD,
  LOGOUT,
} from "reduxs/actions";
import {
  registerSuccess,
  registerError,
  verifyUserSuccess,
  verifyUserError,
  initialChangePasswordSuccess,
  initialChangePasswordError,
  loginSuccess,
  loginError,
  forgotPasswordSuccess,
  forgotPasswordError,
  verifyResetTokenSuccess,
  verifyResetTokenError,
  resetPasswordSuccess,
  resetPasswordError,
  verifyEmailSuccess,
  verifyEmailError,
  logoutSuccess,
  changePasswordSuccess,
  changePasswordError,
  logoutError,
} from "./action";
import { toaster, parseMessage, handleResponseErrorMessage } from "helpers";

export function* watchRegister() {
  yield takeEvery(REGISTER, register);
}

const registerAsync = async (data) => {
  return AuthService.register(data);
};

function* register({ payload }) {
  try {
    const response = yield call(registerAsync, payload.registerData);
    if (response.data.success) {
      yield put(registerSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      yield put(registerError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(registerError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchVerifyUser() {
  yield takeEvery(VERIFY_USER, verifyUser);
}

const verifyUserAsync = async (token) => {
  return AuthService.verifyUser(token);
};

function* verifyUser({ payload }) {
  try {
    const response = yield call(verifyUserAsync, payload.token);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(verifyUserSuccess(response.data.success, response.data.data));
      if (response?.data?.data?.token) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
      }
      payload.navigate(
        response?.data?.data?.token
          ? "/dashboard"
          : `/auth/initial-change-password/${response?.data?.data?.userId}/${response?.data?.data?.verificationCode}`
      );
    } else {
      toaster("", response.data.message);
      yield put(verifyUserError(response.data.message));
      payload.navigate("/auth/login");
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    payload.navigate("/auth/login");
    toaster("error", errMessage);
    yield put(verifyUserError(errMessage));
  }
}

export function* watchInitialChangePassword() {
  yield takeEvery(INITIAL_CHANGE_PASSWORD, initialChangePassword);
}

const initialChangePasswordAsyc = async (data) => {
  return AuthService.initialChangePassword(data);
};

function* initialChangePassword({ payload }) {
  try {
    const response = yield call(initialChangePasswordAsyc, payload.changePasswordData);
    if (response.data.success) {
      yield put(initialChangePasswordSuccess(response.data.success, response.data.data));
      toaster("success", response.data.message);
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      payload.navigate("/dashboard");
    } else {
      toaster("error", response.data.message);
      yield put(initialChangePasswordError(response.data.message));
    }
  } catch (error) {
    const errMessage = handleResponseErrorMessage(parseMessage(error));
    toaster("error", errMessage);
    yield put(initialChangePasswordError(errMessage));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN, login);
}

const loginAsync = async (data) => {
  return AuthService.login(data);
};

function* login({ payload }) {
  try {
    const response = yield call(loginAsync, payload.loginData);
    if (response.data.success) {
      toaster("success", response.data.message);
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      yield put(loginSuccess(response.data.data));
      if (payload.loginData.remember === 1) {
        localStorage.setItem("email", payload.loginData.email);
        localStorage.setItem("password", payload.loginData.password);
        localStorage.setItem("remember", payload.loginData.remember);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("remember");
      }
      payload.navigate("/dashboard");
    } else {
      toaster("", response.data.message);
      yield put(loginError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(loginError(errMessage));
  }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (data) => {
  return AuthService.forgotPassword(data);
};

function* forgotPassword({ payload }) {
  try {
    const response = yield call(forgotPasswordAsync, payload.forgotPasswordData);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(forgotPasswordSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      yield put(forgotPasswordError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(forgotPasswordError(errMessage));
  }
}

export function* watchVerifyResetToken() {
  yield takeEvery(VERIFY_RESET_TOKEN, verifyResetToken);
}

const verifyResetTokenAsync = async (token) => {
  return AuthService.verifyResetToken(token);
};

function* verifyResetToken({ payload }) {
  try {
    const response = yield call(verifyResetTokenAsync, payload.token);
    if (response.data.success) {
      yield put(verifyResetTokenSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      payload.navigate("/auth/login");
      yield put(verifyResetTokenError(response.data.message));
    }
  } catch (error) {
    payload.navigate("/auth/login");
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(verifyResetTokenError(errMessage));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (data) => {
  return AuthService.resetPassword(data);
};

function* resetPassword({ payload }) {
  try {
    const response = yield call(resetPasswordAsync, payload.resetPasswordData);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(resetPasswordSuccess(response.data.success));
      payload.navigate("/auth/login");
    } else {
      toaster("", response.data.message);
      yield put(resetPasswordError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(resetPasswordError(errMessage));
  }
}

export function* watchVerifyEmail() {
  yield takeEvery(VERIFY_EMAIL, verifyEmail);
}

const verifyEmailAsync = async (token) => {
  return AuthService.verifyEmail(token);
};

function* verifyEmail({ payload }) {
  try {
    const response = yield call(verifyEmailAsync, payload.token);
    if (response.data.success) {
      yield put(verifyEmailSuccess(response.data.success, response.data.data));
      toaster("success", response.data.message);
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      payload.navigate("/dashboard");
    } else {
      toaster("", response.data.message);
      payload.navigate("/auth/login");
      yield put(verifyEmailError(response.data.message));
    }
  } catch (error) {
    payload.navigate("/auth/login");
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(verifyEmailError(errMessage));
  }
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}
const changePasswordAsync = async (data) => {
  return AuthService.changePassword(data);
};

function* changePassword({ payload }) {
  try {
    const response = yield call(changePasswordAsync, payload.changePasswordData);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(changePasswordSuccess(response.data.success));
    } else {
      yield put(changePasswordError(response.data.message));
      toaster("error", response.data.message);
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(changePasswordError(errMessage));
  }
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

const logoutAsync = async () => {
  return AuthService.logout();
};

function* logout() {
  try {
    const response = yield call(logoutAsync);
    if (response.data.success) {
      toaster("success", response.data.message);
      yield put(logoutSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      yield put(logoutError(response.data.message));
    }
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    toaster("error", errMessage);
    yield put(logoutError(errMessage));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchVerifyUser),
    fork(watchInitialChangePassword),
    fork(watchLogin),
    fork(watchForgotPassword),
    fork(watchVerifyResetToken),
    fork(watchResetPassword),
    fork(watchVerifyEmail),
    fork(watchChangePassword),
    fork(watchLogout),
  ]);
}

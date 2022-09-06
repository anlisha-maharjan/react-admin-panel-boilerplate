import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import AuthService from "src/services/auth-service";
import {
  REGISTER,
  VERIFY_USER,
  LOGIN,
  FORGOT_PASSWORD,
  VERIFY_RESET_TOKEN,
  RESET_PASSWORD,
  LOGOUT,
} from "src/reduxs/actions";
import {
  registerSuccess,
  registerError,
  verifyUserSuccess,
  verifyUserError,
  loginSuccess,
  loginError,
  forgotPasswordSuccess,
  forgotPasswordError,
  verifyResetTokenSuccess,
  verifyResetTokenError,
  resetPasswordSuccess,
  resetPasswordError,
  logoutSuccess,
  logoutError,
} from "./action";
import { parseMessage } from "src/helpers/util";

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
      yield put(registerSuccess(response.data.success, response.data.message));
    } else {
      yield put(registerError(response.data.message));
    }
  } catch (error) {
    yield put(
      registerError(parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message))
    );
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
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      yield put(verifyUserSuccess(response.data.success, response.data.message));
      payload.navigate("/dashboard");
    } else {
      yield put(verifyUserError(response.data.message));
      payload.navigate("/auth/login", {
        state: { responseMsg: response.data.message },
      });
    }
  } catch (error) {
    payload.navigate("/auth/login", {
      state: {
        responseMsg: parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message),
      },
    });
    yield put(
      verifyUserError(parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message))
    );
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
      yield put(loginError(response.data.message));
    }
  } catch (error) {
    yield put(
      loginError(parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message))
    );
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
      yield put(forgotPasswordSuccess(response.data.success, response.data.message));
    } else {
      yield put(forgotPasswordError(response.data.message));
    }
  } catch (error) {
    yield put(
      forgotPasswordError(
        parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message)
      )
    );
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
      yield put(verifyResetTokenSuccess(response.data.success, response.data.message));
    } else {
      payload.navigate("/auth/login", {
        state: { responseMsg: response.data.message },
      });
      yield put(verifyResetTokenError(response.data.message));
    }
  } catch (error) {
    payload.navigate("/auth/login", {
      state: {
        responseMsg: parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message),
      },
    });
    yield put(
      verifyResetTokenError(
        parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message)
      )
    );
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
      yield put(resetPasswordSuccess(response.data.success, response.data.message));
      payload.navigate("/auth/login", {
        state: { responseMsg: response.data.message },
      });
    } else {
      yield put(resetPasswordError(response.data.message));
    }
  } catch (error) {
    yield put(
      resetPasswordError(
        parseMessage(error.response.data.error ? error.response.data.error : error.response.data.message)
      )
    );
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
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      yield put(logoutSuccess(response.data.success, response.data.message));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      yield put(logoutError(response.data.message));
    }
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    yield put(logoutError(error.response.data.message));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchVerifyUser),
    fork(watchLogin),
    fork(watchForgotPassword),
    fork(watchVerifyResetToken),
    fork(watchResetPassword),
    fork(watchLogout),
  ]);
}

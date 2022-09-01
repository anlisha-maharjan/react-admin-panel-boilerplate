export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const VERIFY_RESET_TOKEN = "VERIFY_RESET_TOKEN";
export const VERIFY_RESET_TOKEN_SUCCESS = "VERIFY_RESET_TOKEN_SUCCESS";
export const VERIFY_RESET_TOKEN_ERROR = "VERIFY_RESET_TOKEN_ERROR";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESSf";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const RESET_AUTH = "RESET_AUTH";

export const login = (loginData, history) => ({
  type: LOGIN,
  payload: { loginData, history },
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const forgotPassword = (forgotPasswordData) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotPasswordData },
});

export const forgotPasswordSuccess = (success, message) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: { success, message },
});

export const forgotPasswordError = (error) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: error,
});

export const verifyResetToken = (token, history) => ({
  type: VERIFY_RESET_TOKEN,
  payload: { token, history },
});

export const verifyResetTokenSuccess = (success, message) => ({
  type: VERIFY_RESET_TOKEN_SUCCESS,
  payload: { success, message },
});

export const verifyResetTokenError = (error) => ({
  type: VERIFY_RESET_TOKEN_ERROR,
  payload: error,
});

export const resetPassword = (resetPasswordData, history) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordData, history },
});

export const resetPasswordSuccess = (success, message) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: { success, message },
});

export const resetPasswordError = (error) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const logout = (history) => ({
  type: LOGOUT,
  payload: { history },
});

export const logoutSuccess = (success, message) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: { success, message },
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};

export const resetAuth = () => ({
  type: RESET_AUTH,
  payload: {},
});

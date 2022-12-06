export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const VERIFY_USER = "VERIFY_USER";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";
export const VERIFY_USER_ERROR = "VERIFY_USER_ERROR";
export const INITIAL_CHANGE_PASSWORD = "INITIAL_CHANGE_PASSWORD";
export const INITIAL_CHANGE_PASSWORD_SUCCESS = "INITIAL_CHANGE_PASSWORD_SUCCESS";
export const INITIAL_CHANGE_PASSWORD_ERROR = "INITIAL_CHANGE_PASSWORD_ERROR";
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
export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_ERROR = "VERIFY_EMAIL_ERROR";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const RESET_AUTH = "RESET_AUTH";

export const register = (registerData) => ({
  type: REGISTER,
  payload: { registerData },
});

export const registerSuccess = (success) => ({
  type: REGISTER_SUCCESS,
  payload: success,
});

export const registerError = (error) => ({
  type: REGISTER_ERROR,
  payload: error,
});

export const verifyUser = (token, navigate) => ({
  type: VERIFY_USER,
  payload: { token, navigate },
});

export const verifyUserSuccess = (success, user) => ({
  type: VERIFY_USER_SUCCESS,
  payload: { success, user },
});

export const verifyUserError = (error) => ({
  type: VERIFY_USER_ERROR,
  payload: error,
});

export const initialChangePassword = (changePasswordData, navigate) => ({
  type: INITIAL_CHANGE_PASSWORD,
  payload: { changePasswordData, navigate },
});

export const initialChangePasswordSuccess = (success, user) => ({
  type: INITIAL_CHANGE_PASSWORD_SUCCESS,
  payload: { success, user },
});

export const initialChangePasswordError = (error) => ({
  type: INITIAL_CHANGE_PASSWORD_ERROR,
  payload: error,
});

export const login = (loginData, navigate) => ({
  type: LOGIN,
  payload: { loginData, navigate },
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

export const forgotPasswordSuccess = (success) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: success,
});

export const forgotPasswordError = (error) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: error,
});

export const verifyResetToken = (token, navigate) => ({
  type: VERIFY_RESET_TOKEN,
  payload: { token, navigate },
});

export const verifyResetTokenSuccess = (success) => ({
  type: VERIFY_RESET_TOKEN_SUCCESS,
  payload: success,
});

export const verifyResetTokenError = (error) => ({
  type: VERIFY_RESET_TOKEN_ERROR,
  payload: error,
});

export const resetPassword = (resetPasswordData, navigate) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordData, navigate },
});

export const resetPasswordSuccess = (success) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: success,
});

export const resetPasswordError = (error) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const changePassword = (changePasswordData) => ({
  type: CHANGE_PASSWORD,
  payload: { changePasswordData },
});

export const changePasswordSuccess = (success) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: success,
});

export const changePasswordError = (error) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
});

export const verifyEmail = (token, navigate) => ({
  type: VERIFY_EMAIL,
  payload: { token, navigate },
});

export const verifyEmailSuccess = (success, user) => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload: { success, user },
});

export const verifyEmailError = (error) => ({
  type: VERIFY_EMAIL_ERROR,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
  payload: {},
});

export const logoutSuccess = (success) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: success,
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

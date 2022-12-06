export const GET_ALL_USER = "GET_ALL_USER";
export const GET_ALL_USER_SUCCESS = "GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_ERROR = "GET_ALL_USER_ERROR";
export const GET_USER_LIST = "GET_USER_LIST";
export const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS";
export const GET_USER_LIST_ERROR = "GET_USER_LIST_ERROR";
export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_ERROR = "ADD_USER_ERROR";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_ERROR = "EDIT_USER_ERROR";
export const RESEND_VERIFICATION_CODE = "RESEND_VERIFICATION_CODE";
export const RESEND_VERIFICATION_CODE_SUCCESS = "RESEND_VERIFICATION_CODE_SUCCESS";
export const RESEND_VERIFICATION_CODE_ERROR = "RESEND_VERIFICATION_CODE_ERROR";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";
export const RESET_USER = "RESET_USER";

export const getAllUser = () => ({
  type: GET_ALL_USER,
  payload: {},
});

export const getAllUserSuccess = (users) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: users,
});

export const getAllUserError = (error) => ({
  type: GET_ALL_USER_ERROR,
  payload: error,
});

export const getUserList = (dbParam) => ({
  type: GET_USER_LIST,
  payload: { dbParam },
});

export const getUserListSuccess = (userList, metaData) => ({
  type: GET_USER_LIST_SUCCESS,
  payload: { userList, metaData },
});

export const getUserListError = (error) => ({
  type: GET_USER_LIST_ERROR,
  payload: error,
});

export const addUser = (userData, navigate) => ({
  type: ADD_USER,
  payload: { userData, navigate },
});

export const addUserSuccess = (success) => ({
  type: ADD_USER_SUCCESS,
  payload: success,
});

export const addUserError = (error) => ({
  type: ADD_USER_ERROR,
  payload: error,
});

export const getUser = (userId) => ({
  type: GET_USER,
  payload: { userId },
});

export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  payload: userData,
});

export const getUserError = (error) => ({
  type: GET_USER_ERROR,
  payload: error,
});

export const editUser = (userId, userData, navigate) => ({
  type: EDIT_USER,
  payload: { userId, userData, navigate },
});

export const editUserSuccess = (success) => ({
  type: EDIT_USER_SUCCESS,
  payload: success,
});

export const editUserError = (error) => ({
  type: EDIT_USER_ERROR,
  payload: error,
});

export const resendVerificationCode = (userId) => ({
  type: RESEND_VERIFICATION_CODE,
  payload: { userId },
});

export const resendVerificationCodeSuccess = (success) => ({
  type: RESEND_VERIFICATION_CODE_SUCCESS,
  payload: success,
});

export const resendVerificationCodeError = (error) => ({
  type: RESEND_VERIFICATION_CODE_ERROR,
  payload: error,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: { userId },
});

export const deleteUserSuccess = (success) => ({
  type: DELETE_USER_SUCCESS,
  payload: success,
});

export const deleteUserError = (error) => ({
  type: DELETE_USER_ERROR,
  payload: error,
});

export const resetUser = () => ({
  type: RESET_USER,
  payload: {},
});

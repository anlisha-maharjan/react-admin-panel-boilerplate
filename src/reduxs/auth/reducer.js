import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  VERIFY_RESET_TOKEN,
  VERIFY_RESET_TOKEN_SUCCESS,
  VERIFY_RESET_TOKEN_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  RESET_AUTH,
} from "src/reduxs/actions";

const INIT_STATE = {
  forgotPasswordData: null,
  resetPasswordData: null,
  loginData: null,
  token: null,
  user: JSON.parse(localStorage.getItem("currentUser")),
  success: false,
  message: null,
  loading: false,
  loading1: false,
  error: null,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: null };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case VERIFY_RESET_TOKEN:
      return { ...state, loading1: true, error: null };
    case VERIFY_RESET_TOKEN_SUCCESS:
      return {
        ...state,
        loading1: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case VERIFY_RESET_TOKEN_ERROR:
      return {
        ...state,
        loading1: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: null };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case RESET_AUTH:
      return {
        ...state,
        success: false,
        message: null,
        loading: false,
        loading1: false,
        error: null,
      };
    default:
      return { ...state };
  }
};
export default authReducer;

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  VERIFY_USER,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  INITIAL_CHANGE_PASSWORD,
  INITIAL_CHANGE_PASSWORD_ERROR,
  INITIAL_CHANGE_PASSWORD_SUCCESS,
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
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  RESET_AUTH,
} from "reduxs/actions";

const INIT_STATE = {
  forgotPasswordData: null,
  resetPasswordData: null,
  changePasswordData: null,
  registerData: null,
  loginData: null,
  token: null,
  user: JSON.parse(localStorage.getItem("currentUser")),
  success: false,
  loading: false,
  tokenLoading: false,
  error: null,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VERIFY_USER:
      return { ...state, tokenLoading: true, error: null };
    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        tokenLoading: false,
        success: action.payload.success,
        user: action.payload.user,
        error: null,
      };
    case VERIFY_USER_ERROR:
      return {
        ...state,
        tokenLoading: false,
        success: false,
        user: null,
        error: action.payload,
      };
    case INITIAL_CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case INITIAL_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        user: action.payload.user,
        error: null,
      };
    case INITIAL_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        user: null,
        error: action.payload,
      };
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
        success: action.payload,
        error: null,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VERIFY_RESET_TOKEN:
      return { ...state, tokenLoading: true, error: null };
    case VERIFY_RESET_TOKEN_SUCCESS:
      return {
        ...state,
        tokenLoading: false,
        success: action.payload,
        error: null,
      };
    case VERIFY_RESET_TOKEN_ERROR:
      return {
        ...state,
        tokenLoading: false,
        success: false,
        error: action.payload,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: null };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VERIFY_EMAIL:
      return { ...state, tokenLoading: true, error: null };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        tokenLoading: false,
        success: action.payload.success,
        user: action.payload.user,
        error: null,
      };
    case VERIFY_EMAIL_ERROR:
      return {
        ...state,
        tokenLoading: false,
        success: false,
        user: null,
        error: action.payload,
      };
    case CHANGE_PASSWORD:
      return { ...state, loading: true, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
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
        success: action.payload,
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
        loading: false,
        tokenLoading: false,
        error: null,
      };
    default:
      return { ...state };
  }
};
export default authReducer;

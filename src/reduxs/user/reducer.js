import {
  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_ERROR,
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_MULTIPLE_USER,
  DELETE_MULTIPLE_USER_SUCCESS,
  DELETE_MULTIPLE_USER_ERROR,
  RESET_USER,
} from "src/reduxs/actions";

const INIT_STATE = {
  dbParam: null,
  users: null,
  userList: null,
  userData: null,
  userId: null,
  userIds: null,
  success: false,
  message: null,
  loading: false,
  loading1: false,
  error: null,
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        error: null,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case GET_ALL_USER_ERROR:
      return {
        ...state,
        users: null,
        error: action.payload,
      };
    case GET_USER_LIST:
      return {
        ...state,
        loading: true,
        userData: null,
        userId: null,
        userIds: null,
        error: null,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
        error: null,
      };
    case GET_USER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        userList: null,
        error: action.payload,
      };
    case ADD_USER:
      return { ...state, loading: true, error: null };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case GET_USER:
      return { ...state, error: null };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
    case EDIT_USER:
      return { ...state, loading: true, error: null };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case DELETE_USER:
      return { ...state, loading1: true, error: null };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading1: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading1: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case DELETE_MULTIPLE_USER:
      return { ...state, loading1: true, error: null };
    case DELETE_MULTIPLE_USER_SUCCESS:
      return {
        ...state,
        loading1: false,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case DELETE_MULTIPLE_USER_ERROR:
      return {
        ...state,
        loading1: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        loading: false,
        loading1: false,
        success: false,
        message: null,
        error: null,
      };
    default:
      return { ...state };
  }
};
export default userReducer;

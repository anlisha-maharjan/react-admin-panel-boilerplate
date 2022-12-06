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
  RESEND_VERIFICATION_CODE,
  RESEND_VERIFICATION_CODE_SUCCESS,
  RESEND_VERIFICATION_CODE_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  RESET_USER,
} from "reduxs/actions";

const INIT_STATE = {
  dbParam: null,
  users: null,
  userList: null,
  metaData: null,
  userData: null,
  userId: null,
  success: false,
  loading: false,
  delLoading: false,
  codeLoading: false,
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
        error: null,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload.userList,
        metaData: action.payload.metaData,
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
        success: action.payload,
        error: null,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
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
        success: action.payload,
        error: null,
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case RESEND_VERIFICATION_CODE:
      return { ...state, codeLoading: true, error: null };
    case RESEND_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        codeLoading: false,
        success: action.payload,
        error: null,
      };
    case RESEND_VERIFICATION_CODE_ERROR:
      return {
        ...state,
        codeLoading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_USER:
      return { ...state, delLoading: true, error: null };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        delLoading: false,
        success: action.payload,
        error: null,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        delLoading: false,
        success: false,
        error: action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        loading: false,
        delLoading: false,
        codeLoading: false,
        success: false,
        error: null,
      };
    default:
      return { ...state };
  }
};
export default userReducer;

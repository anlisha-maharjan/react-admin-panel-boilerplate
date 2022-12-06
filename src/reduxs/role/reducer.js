import {
  GET_ALL_ROLE,
  GET_ALL_ROLE_SUCCESS,
  GET_ALL_ROLE_ERROR,
  GET_ROLE_LIST,
  GET_ROLE_LIST_SUCCESS,
  GET_ROLE_LIST_ERROR,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_ERROR,
  GET_ROLE,
  GET_ROLE_SUCCESS,
  GET_ROLE_ERROR,
  EDIT_ROLE,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_ERROR,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_ERROR,
  RESET_ROLE,
} from "reduxs/actions";

const INIT_STATE = {
  dbParam: null,
  roles: null,
  roleList: null,
  metaData: null,
  roleData: null,
  roleId: null,
  success: false,
  loading: false,
  delLoading: false,
  error: null,
};

const roleReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ROLE:
      return {
        ...state,
        error: null,
      };
    case GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        error: null,
      };
    case GET_ALL_ROLE_ERROR:
      return {
        ...state,
        roles: null,
        error: action.payload,
      };
    case GET_ROLE_LIST:
      return {
        ...state,
        loading: true,
        roleData: null,
        roleId: null,
        error: null,
      };
    case GET_ROLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roleList: action.payload.roleList,
        metaData: action.payload.metaData,
        error: null,
      };
    case GET_ROLE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        roleList: null,
        error: action.payload,
      };
    case ADD_ROLE:
      return { ...state, loading: true, error: null };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case ADD_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ROLE:
      return { ...state, error: null };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        roleData: action.payload,
        error: null,
      };
    case GET_ROLE_ERROR:
      return {
        ...state,
        roleData: null,
        error: action.payload,
      };
    case EDIT_ROLE:
      return { ...state, loading: true, error: null };
    case EDIT_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case EDIT_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_ROLE:
      return { ...state, delLoading: true, error: null };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        delLoading: false,
        success: action.payload,
        error: null,
      };
    case DELETE_ROLE_ERROR:
      return {
        ...state,
        delLoading: false,
        success: false,
        error: action.payload,
      };
    case RESET_ROLE:
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
export default roleReducer;

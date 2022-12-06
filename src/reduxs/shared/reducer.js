import {
  GET_SINGLE_CONFIG_CHOICE,
  GET_SINGLE_CONFIG_CHOICE_SUCCESS,
  GET_SINGLE_CONFIG_CHOICE_ERROR,
  GET_MULTIPLE_CONFIG_CHOICE,
  GET_MULTIPLE_CONFIG_CHOICE_SUCCESS,
  GET_MULTIPLE_CONFIG_CHOICE_ERROR,
  GET_MODULE,
  GET_MODULE_SUCCESS,
  GET_MODULE_ERROR,
  GET_PERMISSION,
  GET_PERMISSION_SUCCESS,
  GET_PERMISSION_ERROR,
} from "../actions";

const INIT_STATE = {
  singleChoiceList: null,
  multipleChoiceList: null,
  moduleList: null,
  permissionList: null,
  success: false,
  loading: false,
  error: null,
};

const sharedReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SINGLE_CONFIG_CHOICE:
      return {
        ...state,
        error: null,
      };
    case GET_SINGLE_CONFIG_CHOICE_SUCCESS:
      return {
        ...state,
        singleChoiceList: action.payload,
        error: null,
      };
    case GET_SINGLE_CONFIG_CHOICE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_MULTIPLE_CONFIG_CHOICE:
      return {
        ...state,
        error: null,
      };
    case GET_MULTIPLE_CONFIG_CHOICE_SUCCESS:
      return {
        ...state,
        multipleChoiceList: action.payload,
        error: null,
      };
    case GET_MULTIPLE_CONFIG_CHOICE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_MODULE:
      return { ...state, error: null };
    case GET_MODULE_SUCCESS:
      return {
        ...state,
        moduleList: action.payload,
        error: null,
      };
    case GET_MODULE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PERMISSION:
      return { ...state, error: null };
    case GET_PERMISSION_SUCCESS:
      return {
        ...state,
        permissionList: action.payload,
        error: null,
      };
    case GET_PERMISSION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export default sharedReducer;

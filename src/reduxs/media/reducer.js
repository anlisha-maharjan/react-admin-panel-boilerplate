import {
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_SUCCESS,
  UPLOAD_MEDIA_ERROR,
  DELETE_MEDIA,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_ERROR,
  DOWNLOAD_MEDIA,
  DOWNLOAD_MEDIA_SUCCESS,
  DOWNLOAD_MEDIA_ERROR,
  RESET_MEDIA,
} from "../actions";

const INIT_STATE = {
  mediaFile: null,
  field: null,
  mediaData: null,
  mediaId: null,
  fileName: null,
  mimeType: null,
  success: false,
  message: null,
  loading: false,
  error: null,
};

const mediaReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_MEDIA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        mediaData: action.payload,
        error: null,
      };
    case UPLOAD_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        mediaData: null,
        error: action.payload,
      };
    case DELETE_MEDIA:
      return { ...state, error: null };
    case DELETE_MEDIA_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case DELETE_MEDIA_ERROR:
      return {
        ...state,
        success: false,
        message: null,
        error: action.payload,
      };
    case DOWNLOAD_MEDIA:
      return { ...state, error: null };
    case DOWNLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        error: null,
      };
    case DOWNLOAD_MEDIA_ERROR:
      return {
        ...state,
        success: false,
        message: null,
        error: action.payload,
      };
    case RESET_MEDIA:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: null,
      };
    default:
      return { ...state };
  }
};
export default mediaReducer;

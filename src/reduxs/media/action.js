export const UPLOAD_MEDIA = "UPLOAD_MEDIA";
export const UPLOAD_MEDIA_SUCCESS = "UPLOAD_MEDIA_SUCCESS";
export const UPLOAD_MEDIA_ERROR = "UPLOAD_MEDIA_ERROR";
export const DELETE_MEDIA = "DELETE_MEDIA";
export const DELETE_MEDIA_SUCCESS = "DELETE_MEDIA_SUCCESS";
export const DELETE_MEDIA_ERROR = "DELETE_MEDIA_ERROR";
export const DOWNLOAD_MEDIA = "DOWNLOAD_MEDIA";
export const DOWNLOAD_MEDIA_SUCCESS = "DOWNLOAD_MEDIA_SUCCESS";
export const DOWNLOAD_MEDIA_ERROR = "DOWNLOAD_MEDIA_ERROR";
export const RESET_MEDIA = "RESET_MEDIA";

export const uploadMedia = (mediaFile, field) => ({
  type: UPLOAD_MEDIA,
  payload: { mediaFile, field },
});

export const uploadMediaSuccess = (mediaData) => ({
  type: UPLOAD_MEDIA_SUCCESS,
  payload: mediaData,
});

export const uploadMediaError = (error) => ({
  type: UPLOAD_MEDIA_ERROR,
  payload: error,
});

export const deleteMedia = (mediaId) => ({
  type: DELETE_MEDIA,
  payload: { mediaId },
});

export const deleteMediaSuccess = (success) => ({
  type: DELETE_MEDIA_SUCCESS,
  payload: success,
});

export const deleteMediaError = (error) => ({
  type: DELETE_MEDIA_ERROR,
  payload: error,
});

export const downloadMedia = (mediaId, fileName, mimeType) => ({
  type: DOWNLOAD_MEDIA,
  payload: { mediaId, fileName, mimeType },
});

export const downloadMediaSuccess = (success) => ({
  type: DOWNLOAD_MEDIA_SUCCESS,
  payload: success,
});

export const downloadMediaError = (error) => ({
  type: DOWNLOAD_MEDIA_ERROR,
  payload: error,
});

export const resetMedia = () => ({
  type: RESET_MEDIA,
  payload: {},
});

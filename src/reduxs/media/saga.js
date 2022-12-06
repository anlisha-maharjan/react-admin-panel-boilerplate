import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import saveAs from "file-saver";
import MediaService from "services/MediaService";
import { UPLOAD_MEDIA, DELETE_MEDIA, DOWNLOAD_MEDIA } from "reduxs/actions";
import {
  uploadMediaSuccess,
  uploadMediaError,
  deleteMediaSuccess,
  deleteMediaError,
  downloadMediaSuccess,
  downloadMediaError,
} from "./action";
import { toaster, parseMessage, handleResponseErrorMessage } from "helpers";

export function* watchUploadMedia() {
  yield takeEvery(UPLOAD_MEDIA, uploadMedia);
}

const uploadMediaAsync = async (file) => {
  return MediaService.upload(file);
};

function* uploadMedia({ payload }) {
  try {
    const response = yield call(uploadMediaAsync, payload.mediaFile);
    if (response.data.success) {
      const data = response.data.data;
      data.field = payload.field ? payload.field : "";
      yield put(uploadMediaSuccess(data));
    } else {
      toaster("", response.data.message);
      yield put(uploadMediaError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(uploadMediaError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchDeleteMedia() {
  yield takeEvery(DELETE_MEDIA, deleteMedia);
}

const deleteMediaAsync = async (id) => {
  return MediaService.delete(id);
};

function* deleteMedia({ payload }) {
  try {
    const response = yield call(deleteMediaAsync, payload.mediaId);
    if (response.data.success) {
      yield put(deleteMediaSuccess(response.data.success));
    } else {
      toaster("", response.data.message);
      yield put(deleteMediaError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(deleteMediaError(errMessage));
    toaster("error", errMessage);
  }
}

export function* watchDownloadMedia() {
  yield takeEvery(DOWNLOAD_MEDIA, downloadMedia);
}

const downloadMediaAsync = async (id) => {
  return MediaService.download(id);
};

function* downloadMedia({ payload }) {
  try {
    const response = yield call(downloadMediaAsync, payload.mediaId);
    if (response && response.data) {
      toaster("success", response.data.message);
      yield put(downloadMediaSuccess(true));
      const blob = new Blob([response.data], { type: payload.mimeType });
      saveAs(blob, payload.fileName);
    } else {
      toaster("", response.data.message);
      yield put(downloadMediaError(response.data.message));
    }
  } catch (error) {
    const errMessage = parseMessage(handleResponseErrorMessage(error));
    yield put(downloadMediaError(errMessage));
    toaster("error", errMessage);
  }
}

export default function* rootSaga() {
  yield all([fork(watchUploadMedia), fork(watchDeleteMedia), fork(watchDownloadMedia)]);
}

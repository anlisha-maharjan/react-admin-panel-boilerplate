import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import MediaService from "src/services/media-service";
import { UPLOAD_MEDIA, DELETE_MEDIA, DOWNLOAD_MEDIA } from "src/reduxs/actions";
import {
  uploadMediaSuccess,
  uploadMediaError,
  deleteMediaSuccess,
  deleteMediaError,
  downloadMediaSuccess,
  downloadMediaError,
} from "./action";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import ToastElement from "src/components/toast";

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
      let data = response.data.data;
      data.field = payload.field ? payload.field : "";
      yield put(uploadMediaSuccess(data));
    } else {
      yield put(uploadMediaError(response.data.message));
    }
  } catch (error) {
    yield put(uploadMediaError(error.response.data.message));
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
      yield put(
        deleteMediaSuccess(response.data.success, response.data.message)
      );
    } else {
      yield put(deleteMediaError(response.data.message));
    }
  } catch (error) {
    yield put(deleteMediaError(error.response.data.message));
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
      yield put(downloadMediaSuccess(true, ""));
      const blob = new Blob([response.data], { type: payload.mimeType });
      saveAs(blob, payload.fileName);
    } else {
      toast.error(
        <ToastElement type="error" message={response.data.message} />,
        { containerId: "default" }
      );
      yield put(downloadMediaError(response.data.message));
    }
  } catch (error) {
    toast.error(
      <ToastElement type="error" message={error.response.data.message} />,
      { containerId: "default" }
    );
    yield put(downloadMediaError(error.response.data.message));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchUploadMedia),
    fork(watchDeleteMedia),
    fork(watchDownloadMedia),
  ]);
}

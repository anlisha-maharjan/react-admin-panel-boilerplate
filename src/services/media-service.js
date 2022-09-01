import Req from "src/interceptors/token-interceptor";

const MediaService = (function () {
  function _upload(file) {
    var res = new FormData();
    res.append("file", file);
    return Req.post("/api/medias", res, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  function _delete(id) {
    return Req.delete("/api/medias/" + id);
  }

  function _download(id) {
    return Req.get(`/api/download/${id}`, {
      responseType: "arraybuffer",
    });
  }

  return {
    upload: _upload,
    delete: _delete,
    download: _download,
  };
})();
export default MediaService;

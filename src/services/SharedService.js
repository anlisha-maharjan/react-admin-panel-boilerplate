import Req from "interceptors/TokenInterceptor";

const SharedService = (function () {
  function _getSingleConfigChoice(category) {
    return Req.get(`/api/config-choice/${category}`);
  }

  function _getMultipleConfigChoice(data) {
    return Req.post(`/api/multiple-config-choices`, { categories: data });
  }

  function _getModule() {
    return Req.get("/api/modules");
  }

  function _getPermission(id) {
    return Req.get(`/api/permissions/${id}`);
  }

  return {
    getSingleConfigChoice: _getSingleConfigChoice,
    getMultipleConfigChoice: _getMultipleConfigChoice,
    getPermission: _getPermission,
    getModule: _getModule,
  };
})();
export default SharedService;

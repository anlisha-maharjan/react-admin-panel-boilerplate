import Req from "interceptors/TokenInterceptor";

const ConfigChoiceService = (function () {
  function _getAllConfigChoice() {
    return Req.get("/api/config-choices");
  }
  function _addConfigChoice(data) {
    return Req.post("/api/config-choices", data);
  }
  function _getConfigChoice(id) {
    return Req.get(`/api/config-choices/${id}`);
  }
  function _editConfigChoice(data, id) {
    return Req.put(`/api/config-choices/${id}`, data);
  }
  function _deleteConfigChoice(id) {
    return Req.delete(`/api/config-choices/${id}`);
  }
  return {
    getAllConfigChoice: _getAllConfigChoice,
    addConfigChoice: _addConfigChoice,
    getConfigChoice: _getConfigChoice,
    editConfigChoice: _editConfigChoice,
    deleteConfigChoice: _deleteConfigChoice,
  };
})();
export default ConfigChoiceService;

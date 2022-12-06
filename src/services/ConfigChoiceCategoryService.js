import Req from "interceptors/TokenInterceptor";

const ConfigChoiceCategoryService = (function () {
  function _getAllConfigChoiceCategory() {
    return Req.get("/api/config-choice-categories");
  }
  function _addConfigChoiceCategory(data) {
    return Req.post("/api/config-choice-categories", data);
  }
  function _getConfigChoiceCategory(id) {
    return Req.get(`/api/config-choice-categories/${id}`);
  }
  function _editConfigChoiceCategory(data, id) {
    return Req.put(`/api/config-choice-categories/${id}`, data);
  }
  function _deleteConfigChoiceCategory(id) {
    return Req.delete(`/api/config-choice-categories/${id}`);
  }
  return {
    getAllConfigChoiceCategory: _getAllConfigChoiceCategory,
    addConfigChoiceCategory: _addConfigChoiceCategory,
    getConfigChoiceCategory: _getConfigChoiceCategory,
    editConfigChoiceCategory: _editConfigChoiceCategory,
    deleteConfigChoiceCategory: _deleteConfigChoiceCategory,
  };
})();
export default ConfigChoiceCategoryService;

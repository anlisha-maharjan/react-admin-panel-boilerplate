import Req from "interceptors/TokenInterceptor";

const RoleService = (function () {
  function _getAllRole() {
    return Req.get("/api/roles");
  }
  function _addRole(data) {
    return Req.post("/api/roles", data);
  }
  function _getRole(id) {
    return Req.get(`/api/roles/${id}`);
  }
  function _editRole(data, id) {
    return Req.put(`/api/roles/${id}`, data);
  }
  function _deleteRole(id) {
    return Req.delete(`/api/roles/${id}`);
  }
  return {
    getAllRole: _getAllRole,
    addRole: _addRole,
    getRole: _getRole,
    editRole: _editRole,
    deleteRole: _deleteRole,
  };
})();
export default RoleService;

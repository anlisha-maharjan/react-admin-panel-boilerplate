import Req from "src/interceptors/token-interceptor";

const UserService = (function () {
  function _getAllUser() {
    return Req.get(`/api/users`);
  }
  function _getUser(id) {
    return Req.get("/api/users/" + id);
  }
  function _addUser(data) {
    return Req.post("/api/users", data);
  }
  function _editUser(data, id) {
    return Req.put("/api/users/" + id, data);
  }
  function _deleteUser(id) {
    return Req.delete("/api/users/" + id);
  }
  function _deleteMultipleUser(ids) {
    return Req.post("/api/users/delete", { ids: ids });
  }
  function _changePassword(data) {
    return Req.post(`/api/changePassword`, data);
  }
  return {
    getAllUser: _getAllUser,
    getUser: _getUser,
    addUser: _addUser,
    editUser: _editUser,
    deleteUser: _deleteUser,
    deleteMultipleUser: _deleteMultipleUser,
    changePassword: _changePassword,
  };
})();
export default UserService;

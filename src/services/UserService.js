import Req from "interceptors/TokenInterceptor";

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
  function _resendVerificationCode(id) {
    return Req.get(`/api/users/verificationCode/${id}`);
  }
  function _deleteUser(id) {
    return Req.delete("/api/users/" + id);
  }
  return {
    getAllUser: _getAllUser,
    getUser: _getUser,
    addUser: _addUser,
    editUser: _editUser,
    resendVerificationCode: _resendVerificationCode,
    deleteUser: _deleteUser,
  };
})();
export default UserService;

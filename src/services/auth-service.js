import Req from "src/interceptors/token-interceptor";
import AuthReq from "src/interceptors/auth-interceptor";

const AuthService = (function () {
  function _register(data) {
    return AuthReq.post("/api/register", data);
  }

  function _verifyUser(token) {
    return AuthReq.get(`/api/users/verify/${token}`);
  }

  function _login(data) {
    return AuthReq.post("/api/login", data);
  }

  function _forgotPassword(data) {
    return AuthReq.post("/api/forgotPassword", data);
  }

  function _verifyResetToken(token) {
    return AuthReq.get(`/api/verify/resetToken/${token}`);
  }

  function _resetPassword(data) {
    return AuthReq.post("/api/resetPassword", data);
  }

  function _logout() {
    return Req.get("/api/logout");
  }

  return {
    register: _register,
    verifyUser: _verifyUser,
    login: _login,
    forgotPassword: _forgotPassword,
    verifyResetToken: _verifyResetToken,
    resetPassword: _resetPassword,
    logout: _logout,
  };
})();
export default AuthService;

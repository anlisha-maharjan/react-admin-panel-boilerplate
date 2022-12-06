import Req from "interceptors/TokenInterceptor";
import AuthReq from "interceptors/AuthInterceptor";

const AuthService = (function () {
  function _register(data) {
    return AuthReq.post("/api/register", data);
  }

  function _verifyUser(token) {
    return AuthReq.get(`/api/verify/user/${token}`);
  }

  function _initialChangePassword(data) {
    return Req.post(`/api/initialChangePassword`, data);
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

  function _changePassword(data) {
    return Req.post("/api/changePassword", data);
  }

  function _verifyEmail(token) {
    return AuthReq.get(`/api/verify/email/${token}`);
  }

  function _logout() {
    return Req.get("/api/logout");
  }

  return {
    register: _register,
    verifyUser: _verifyUser,
    initialChangePassword: _initialChangePassword,
    login: _login,
    forgotPassword: _forgotPassword,
    verifyResetToken: _verifyResetToken,
    resetPassword: _resetPassword,
    changePassword: _changePassword,
    verifyEmail: _verifyEmail,
    logout: _logout,
  };
})();
export default AuthService;

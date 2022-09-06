import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "src/reduxs/actions";
import { LayoutSplashScreen } from "src/configs/splash-screen";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.user != null ? <LayoutSplashScreen /> : <Navigate from="/logout" to="/auth/login" />}</>;
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, {
  logout,
})(Logout);

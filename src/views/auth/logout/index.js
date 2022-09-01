import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "src/reduxs/actions";
import { Navigate } from "react-router-dom";
import { LayoutSplashScreen } from "src/configs/core";
class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <>{this.props.user != null ? <LayoutSplashScreen /> : <Navigate to="/" />}</>;
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, {
  logout,
})(Logout);

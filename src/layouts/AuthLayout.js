import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = (props) => {
  return (
    <div className="main-wrapper">
      <div className="auth-wrap">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

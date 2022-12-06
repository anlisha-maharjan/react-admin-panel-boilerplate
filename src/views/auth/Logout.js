import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "reduxs/actions";
import { LayoutSplashScreen } from "configs/LayoutSplashScreen";

const Logout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <>{user != null ? <LayoutSplashScreen /> : <Navigate from="/logout" to="/auth/login" />}</>;
};
export default Logout;

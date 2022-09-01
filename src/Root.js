import React from "react";
import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Layout } from "src/layouts";
import IconView from "src/views/icon";
import LoginView from "src/views/auth/login";
import ForgotPasswordView from "src/views/auth/forgot-password";
import ResetPasswordView from "src/views/auth/reset-password";
import LogoutView from "src/views/auth/logout";
import NotFoundView from "src/views/not-found";
import DashboardView from "src/views/app/dashboard";
import UserView from "src/views/app/user";

export default function Root() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/icon" element={<IconView />} />
          <Route path="/auth" element={!isAuthorized ? <Outlet /> : <Navigate from="/auth" to="/" />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
            <Route path="/auth/reset-password/:token" element={<ResetPasswordView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
          <Route path="/logout" element={<LogoutView />} />
          <Route path="/" element={!isAuthorized ? <Navigate to="/auth/login" /> : <Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/user" element={<UserView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        enableMultiContainer
        containerId={"default"}
      />
    </>
  );
}

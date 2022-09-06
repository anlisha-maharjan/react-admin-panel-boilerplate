import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { LayoutSplashScreen } from "src/configs/splash-screen";
import { Layout, AuthLayout } from "src/layouts";
import IconView from "src/views/icon";
import RegisterView from "src/views/auth/register";
import VerifyUserView from "src/views/auth/verify-user";
import LoginView from "src/views/auth/login";
import ForgotPasswordView from "src/views/auth/forgot-password";
import ResetPasswordView from "src/views/auth/reset-password";
import LogoutView from "src/views/auth/logout";
import NotFoundView from "src/views/not-found";
import DashboardView from "src/views/app/dashboard";
import UserView from "src/views/app/user";
import EditUser from "src/views/app/user/edit";
import ViewUser from "src/views/app/user/view";

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
        <Suspense fallback={<LayoutSplashScreen />}>
          <Routes>
            <Route path="/icon" element={<IconView />} />
            <Route path="/auth" element={!isAuthorized ? <AuthLayout /> : <Navigate from="/auth" to="/" />}>
              <Route index element={<Navigate to="/auth/login" />} />
              <Route path="/auth/register" element={<RegisterView />} />
              <Route path="/auth/verify-user/:token" element={<VerifyUserView />} />
              <Route path="/auth/login" element={<LoginView />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
              <Route path="/auth/reset-password/:token" element={<ResetPasswordView />} />
              <Route path="*" element={<NotFoundView />} />
            </Route>
            <Route path="/logout" element={<LogoutView />} />
            <Route path="/" element={!isAuthorized ? <Navigate from="/" to="/auth/login" /> : <Layout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/user" element={<Outlet />}>
                <Route index element={<UserView />} />
                <Route path="/user/add" element={<EditUser />} />
                <Route path="/user/edit/:id" element={<EditUser />} />
                <Route path="/user/view/:id" element={<ViewUser />} />
              </Route>
              <Route path="*" element={<NotFoundView />} />
            </Route>
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
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

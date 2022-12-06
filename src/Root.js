import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route, Outlet } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { LayoutSplashScreen } from "configs/LayoutSplashScreen";
import { Layout, AuthLayout } from "layouts";
import { ToastWrapper } from "ui";
import {
  Register,
  VerifyUser,
  InitialChangePassword,
  Login,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  Logout,
} from "views/auth";
import Dashboard from "views/app/dashboard";
import Profile from "views/app/profile";
import { UserList, EditUser } from "views/app/user";
import { RoleList, EditRole } from "views/app/role";
import { CustomerList, EditCustomer } from "views/app/customer";
import PageNotFound from "views/PageNotFound";

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
            <Route path="/auth" element={!isAuthorized ? <AuthLayout /> : <Navigate from="/auth" to="/" />}>
              <Route index element={<Navigate to="/auth/login" />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/verify/:token" element={<VerifyUser />} />
              <Route path="/auth/initial-change-password/:id/:token" element={<InitialChangePassword />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
              <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="/logout" element={<Logout />} />

            <Route path="/" element={!isAuthorized ? <Navigate from="/" to="/auth/login" /> : <Layout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-management" element={<Outlet />}>
                <Route index element={<Navigate to="/user-management/role" />} />
                <Route path="/user-management/role" element={<RoleList />} />
                <Route path="/user-management/role/add" element={<EditRole />} />
                <Route path="/user-management/role/edit/:id" element={<EditRole />} />
                <Route path="/user-management/user" element={<UserList />} />
                <Route path="/user-management/user/add" element={<EditUser />} />
                <Route path="/user-management/user/edit/:id" element={<EditUser />} />
                <Route path="/user-management/customer" element={<CustomerList />} />
                <Route path="/user-management/customer/add" element={<EditCustomer />} />
                <Route path="/user-management/customer/edit/:id" element={<EditCustomer />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToastWrapper
        position="top-right"
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

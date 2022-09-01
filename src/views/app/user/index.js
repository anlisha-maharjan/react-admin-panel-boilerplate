import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "src/configs/core";
import UserList from "./list";
import EditUser from "./edit";
import ViewUser from "./view";

function User() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route exact={true} path="/user" component={UserList} />
        <Route path="/user/add" component={EditUser} />
        <Route path="/user/edit/:id" component={EditUser} />
        <Route path="/user/view/:id" component={ViewUser} />
      </Routes>
    </Suspense>
  );
}

export default User;

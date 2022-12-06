import React from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbContainer } from "ui";
import UserForm from "./Form";

const EditUser = () => {
  const params = useParams();

  return (
    <>
      <BreadcrumbContainer
        title={params.id ? "Update user" : "Create a new user"}
        paths={[
          {
            title: "User",
            page: `/user-management/user`,
          },
          {
            title: params.id ? "Edit" : "Add",
          },
        ]}
      />

      <UserForm editId={params.id} />
    </>
  );
};

export default EditUser;

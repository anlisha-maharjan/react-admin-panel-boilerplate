import React from "react";
import { useParams } from "react-router-dom";
import {BreadcrumbContainer} from "ui";
import RoleForm from "./Form";

const EditRole = () => {
  const params = useParams();

  return (
    <>
      <BreadcrumbContainer
        title={params.id ? "Update role" : "Create a new role"}
        paths={[
          {
            title: "Role",
            page: `/user-management/role`,
          },
          {
            title: params.id ? "Edit" : "Add",
          },
        ]}
      />

      <RoleForm editId={params.id} />
    </>
  );
};

export default EditRole;

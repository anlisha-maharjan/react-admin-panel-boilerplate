import React from "react";
import { useParams } from "react-router-dom";
import {BreadcrumbContainer} from "ui";
import CustomerForm from "./Form";

const EditCustomer = () => {
  const params = useParams();

  return (
    <>
      <BreadcrumbContainer
        title={params.id ? "Update customer" : "Create a new customer"}
        paths={[
          {
            title: "Customer",
            page: `/user-management/customer`,
          },
          {
            title: params.id ? "Edit" : "Add",
          },
        ]}
      />

      <CustomerForm editId={params.id} />
    </>
  );
};

export default EditCustomer;

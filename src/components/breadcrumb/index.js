import React from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";

const BreadcrumbContainer = (props) => {
  return (
    <>
      <Mui.Typography
        component="h2"
        variant="h2"
        className="mb-2 font-weight-semi-bold"
      >
        {props?.title || ""}
      </Mui.Typography>

      <Mui.Breadcrumbs separator="/" className="default-breadcrumbs mb-4">
        <Mui.Link color="textSecondary" component={Link} to="/dashboard">
          Dashboard
        </Mui.Link>
        {props.paths.map((item, index) => {
          return (
            <Mui.Link
              key={index}
              color={
                index === props.paths.length - 1 ? "primary" : "textSecondary"
              }
              underline={index === props.paths.length - 1 ? "none" : "hover"}
              component={index === props.paths.length - 1 ? null : Link}
              to={index === props.paths.length - 1 ? null : item.page}
            >
              {item?.title || ""}
            </Mui.Link>
          );
        })}
      </Mui.Breadcrumbs>
    </>
  );
};
export default BreadcrumbContainer;

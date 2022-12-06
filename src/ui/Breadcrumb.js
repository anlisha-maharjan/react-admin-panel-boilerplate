import React from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";

const Item = Mui.styled(Link)(({ theme }) => ({
  color: "#212b36",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const BreadcrumbContainer = (props) => {
  return (
    <Mui.Box display="flex" flexDirection="column" mb={5} className={`${props.classes?.root || ""}`}>
      <Mui.Typography component="h4" variant="h4" mb={1} fontSize="1.5rem" fontWeight="700" lineHeight="1.5">
        {props.title}
      </Mui.Typography>

      <Mui.Breadcrumbs separator="›" sx={{ fontSize: "0.875rem" }}>
        <Item to="/dashboard">Dashboard</Item>

        {props.paths?.map((item, index) => {
          return (
            <span key={index}>
              {index === props.paths.length - 1 ? (
                item?.title || ""
              ) : (
                <Item key={index} to={index === props.paths.length - 1 ? null : item.page ? item.page : "/"}>
                  {item?.title}
                </Item>
              )}
            </span>
          );
        })}
      </Mui.Breadcrumbs>
    </Mui.Box>
  );
};
export default BreadcrumbContainer;

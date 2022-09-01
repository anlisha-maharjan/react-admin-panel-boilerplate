import React from "react";
import * as Mui from "@mui/material";

const UserAvatarCell = (props) => {
  const { data } = props;
  const url =
    data?.userPhoto?.[0]?.url ||
    data?.driverPhoto?.[0]?.url ||
    "/static/images/avatar/1.jpg";

  return (
    <Mui.Box display="flex" component="span">
      <Mui.Avatar
        alt={data?.name || ""}
        src={url}
        className="mr-2 font-weight-normal background-color-primary"
      />
      <Mui.Typography
        component="h6"
        varient="subtitle2"
        className="font-weight-medium"
      >
        {data?.name || ""}
        {data?.firstName || ""} {data?.lastName || ""}
        <Mui.Typography
          component="small"
          variant="body2"
          className="d-block text-color-muted font-weight-light"
        >
          {data.email}
        </Mui.Typography>
      </Mui.Typography>
    </Mui.Box>
  );
};

export default UserAvatarCell;

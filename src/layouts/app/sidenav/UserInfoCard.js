import React, { useMemo } from "react";
import * as Mui from "@mui/material";
import DefaultUserAatar from "assets/images/default-user.png";

const UserInfoCard = (props) => {
  const { drawerOpen } = props;
  const theme = Mui.useTheme();

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  }, [localStorage.getItem("currentUser")]);

  return (
    <Mui.Box
      className="userinfo-box"
      component={Mui.Link}
      href="/profile"
      underline="none"
      display="flex"
      alignItems="center"
      gap={2}
      mb={3}
      p={drawerOpen ? "1rem 1.25rem" : "1rem 0.5rem"}
      borderRadius=".75rem"
      bgcolor={drawerOpen ? "rgba(145, 158, 171, 0.12)" : "transparent"}
    >
      <Mui.Avatar
        src={DefaultUserAatar}
        alt="Amit Rajbhandari"
        size="small"
        sx={{ bgcolor: "#DFE2E7", "& img": { objectFit: "contain" } }}
      />

      <Mui.Typography
        component="span"
        variant="subtitle2"
        color="#000000"
        sx={{ display: drawerOpen ? "block" : "none" }}
      >
        {user?.name}
        <Mui.Typography component="small" variant="body2" display="block" color={theme.palette.grey.dark}>
          {user?.role}
        </Mui.Typography>
      </Mui.Typography>
    </Mui.Box>
  );
};

export default UserInfoCard;

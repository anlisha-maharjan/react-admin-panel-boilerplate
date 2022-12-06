import React from "react";
import * as Mui from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { appBarConfig } from "configs/LayoutConfig";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

const Header = Mui.styled(Mui.AppBar)(({ theme }) => ({
  height: appBarConfig.height,
  flexDirection: "row",
  alignItems: "center",
  padding: "0 2.5rem",
  borderBottom: "1px solid #f5f5f5",
  boxShadow: "none",
  backgroundColor: Mui.alpha(theme.palette.body.light, 0.8),
  backdropFilter: "blur(6px)",
}));

const AppBar = (props) => {
  const { handleDrawerCollapse } = props;

  return (
    <Header position={appBarConfig.style}>
      <Mui.IconButton
        onClick={handleDrawerCollapse}
        edge="start"
        sx={{
          display: { xl: "none" },
          marginRight: 5,
        }}
      >
        <MenuIcon />
      </Mui.IconButton>

      <Mui.Box display="flex" gap={1} ml="auto">
        <NotificationDropdown />
        <UserDropdown />
      </Mui.Box>
    </Header>
  );
};

export default AppBar;

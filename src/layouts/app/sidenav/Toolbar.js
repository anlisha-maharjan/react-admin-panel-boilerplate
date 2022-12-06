import React from "react";
import * as Mui from "@mui/material";
import { sideNavConfig } from "configs/LayoutConfig";
import IconDoubleArrowLeft from "icons/IconDoubleArrowLeft";

const Toolbar = (props) => {
  const { drawerOpen, handleDrawerCollapse } = props;

  const buttonStyle = {
    display: drawerOpen ? { xs: "none", lg: "inline-flex" } : "none",
    marginLeft: "auto",
    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: !drawerOpen ? "rotate(180deg)" : "",
    "&:hover": {
      transform: !drawerOpen ? "scale(1.1) rotate(180deg)" : "scale(1.1)",
    },
  };

  return (
    <Mui.Toolbar sx={{ minHeight: { sm: "initial" }, height: "2.5rem", mb: "1.4375rem", padding: { sm: 0 } }}>
      <img src={sideNavConfig.primaryLogo} alt="logo" className="max-w-full h-full" />

      <Mui.IconButton className="btn-drawer-toggle" sx={buttonStyle} onClick={handleDrawerCollapse}>
        {drawerOpen ? <IconDoubleArrowLeft /> : <IconDoubleArrowLeft />}
      </Mui.IconButton>
    </Mui.Toolbar>
  );
};

export default Toolbar;

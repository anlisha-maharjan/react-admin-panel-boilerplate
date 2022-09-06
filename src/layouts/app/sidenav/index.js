import React from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import { toolBarConfig, sideNavConfig } from "src/configs/constant";
import { IconLogout } from "src/components/svg";
import menuList from "src/configs/menu";
import Menu from "./menu";

const Sidenav = (props) => {
  return (
    <>
      {toolBarConfig.style === "fixed" ? (
        <Mui.Toolbar className="placeholder-toolbar" />
      ) : (
        <Mui.Toolbar className="cms-drawer__toolbar">
          <figure className="toolbar-logo">
            <img src={sideNavConfig.primaryLogo} alt="Logo" />

            <img className="small-logo" src={sideNavConfig.secondaryLogo} alt="Logo" />
          </figure>
        </Mui.Toolbar>
      )}

      <Mui.List className="cms-drawer__list">
        {menuList?.map((item, index) => {
          return <Menu item={item} key={index} closeDrawer={props.closeDrawer} />;
        })}
      </Mui.List>

      <Mui.Box className="cms-drawer__footer">
        <Mui.Button
          startIcon={<IconLogout />}
          className="text-color-side-nav svg-color-side-nav-icon"
          to={"/logout"}
          component={Link}
          disableRipple
          classes={{
            root: "justify-content-start",
          }}
        >
          Logout
        </Mui.Button>

        <Mui.Typography component="h6" variant="body2" className="font-weight-light text-color-side-nav">
          © 2022 Sierra. <br /> All rights reserved.
        </Mui.Typography>
      </Mui.Box>
    </>
  );
};

export default Sidenav;

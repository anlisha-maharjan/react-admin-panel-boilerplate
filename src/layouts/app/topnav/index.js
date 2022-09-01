import React, { useState } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toolBarConfig } from "src/configs/constant";
import defaultAvatar from "src/assets/images/user-avatar.svg";
import { IconChevronDown, IconLogout } from "src/components/svg";
import SideNavTriggerCollapse from "./side-nav-trigger-collapse";
import SideNavTriggerMobile from "./side-nav-trigger-mobile";

const Topnav = (props) => {
  const theme = useTheme();
  const isWidthDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Mui.AppBar
        className={`cms-header ${toolBarConfig.style === "fixed" ? "clipped" : ""}`}
        position={toolBarConfig.style}
      >
        <Mui.Container className="container-fluid m-0" maxWidth={false}>
          <Mui.Toolbar>
            {toolBarConfig.style === "fixed" ? (
              <>
                <figure className="toolbar-logo clipped">
                  <img src={toolBarConfig.primaryLogo} alt="Logo" />
                </figure>
              </>
            ) : null}

            <SideNavTriggerCollapse toggleSideNav={props.toggleSideNav} />

            <SideNavTriggerMobile toggleMobileSideNav={props.toggleMobileSideNav} />

            <Mui.Box display="flex" alignItems="center" className="right-nav">
              <Mui.Box
                display="flex"
                alignItems="center"
                className="ml-2 p-0"
                onClick={openMenu}
                component={Mui.Button}
              >
                <Mui.Avatar src={defaultAvatar} alt={props.user?.firstName || ""} className="background-color-white" />
                {/* {Mui.isWidthDown("md", props.width) ? null : ( */}
                {isWidthDownMd ? null : (
                  <>
                    <Mui.Typography className="font-weight-normal ml-2 text-color-toolbar">
                      {props.user?.firstName || ""} {props.user?.lastName || ""}
                    </Mui.Typography>
                    <span className="ml-1 p-0 line-height-null svg-size-small svg-color-toolbar-icon">
                      <IconChevronDown />
                    </span>
                  </>
                )}
              </Mui.Box>
            </Mui.Box>
          </Mui.Toolbar>
        </Mui.Container>
      </Mui.AppBar>
      <Mui.Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeMenu}
        elevation={0}
        classes={{ paper: "user-dropdown" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Mui.Divider light={true} />
        <Mui.MenuItem onClick={closeMenu} to={"/logout"} component={Link}>
          <span className="icon">
            <IconLogout />
          </span>
          Logout
        </Mui.MenuItem>
      </Mui.Popover>
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user,
  };
};
export default connect(mapStateToProps, {})(Topnav);

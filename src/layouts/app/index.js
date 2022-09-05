import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import { IdleTimeoutManager } from "idle-timer-manager";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router-dom";
import { toolBarConfig, sideNavConfig } from "src/configs/constant";
import Topnav from "./topnav";
import Sidenav from "./sidenav";

const Layout = (props) => {
  const theme = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [drawerCollapse, setDrawerCollapse] = useState(false);
  const [drawerHover, setDrawerHover] = useState(false);

  const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const hanndelMobileDrawerOpenToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const hanndelDrawerCollapseToggle = () => {
    setDrawerCollapse(!drawerCollapse);
  };

  const onHoverDrawer = (hover) => {
    if (drawerCollapse && sideNavConfig.expandOnHover && !sideNavConfig.hoverSubMenu) {
      if (hover === "enter") {
        setDrawerHover(true);
      } else if (hover === "leave") {
        setDrawerHover(false);
      }
    }
  };

  const _onIdle = () => {}

  const checkSmallDevices = () => {
    if (isWidthUpLg) {
      // if (Mui.isWidthUp("lg", this.props.width)) {
      setDrawerCollapse(sideNavConfig.collapseState.lg);
    } else if (isWidthUpMd) {
      // } else if (Mui.isWidthUp("md", this.props.width)) {
      setDrawerCollapse(sideNavConfig.collapseState.md);
    } else {
      setDrawerCollapse(false);
    }
  };

  useEffect(() => {
    checkSmallDevices();
    const manager = new IdleTimeoutManager({
      timeout: 600, // 10 min
      onExpired: (time) => {
        _onIdle();
      },
    });

    // Set Side Nav Layout Colors
    document.documentElement.style.setProperty("--side-nav-bg", sideNavConfig.bgColor);
    document.documentElement.style.setProperty("--side-nav-text-color", sideNavConfig.textColor);
    document.documentElement.style.setProperty("--side-nav-icon-color", sideNavConfig.iconColor);
    document.documentElement.style.setProperty("--side-nav-active-color", sideNavConfig.activeColor);
    document.documentElement.style.setProperty("--side-nav-hover-submenu-color", sideNavConfig.hoverSubmenubg);

    // Set Top Bar Layout Colors
    document.documentElement.style.setProperty("--toolbar-bg", toolBarConfig.bgColor);
    document.documentElement.style.setProperty("--toolbar-text-color", toolBarConfig.textColor);
    document.documentElement.style.setProperty("--toolbar-icon-color", toolBarConfig.iconColor);

    return () => {
      manager.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Mui.Drawer
        className={`cms-drawer ${drawerCollapse ? "collapsed" : "expanded"} ${drawerHover ? "hover-expand" : ""}`}
        variant={isWidthUpMd ? "permanent" : "temporary"}
        // variant={Mui.isWidthUp("md", props.width) ? "permanent" : "temporary"}
        onMouseEnter={() => onHoverDrawer("enter")}
        onMouseLeave={() => onHoverDrawer("leave")}
        open={mobileDrawerOpen}
        onClose={hanndelMobileDrawerOpenToggle}
        anchor="left"
      >
        <Sidenav location={props.location} closeDrawer={hanndelMobileDrawerOpenToggle} />
      </Mui.Drawer>

      <main className={`cms-drawer-content ${drawerCollapse ? "collapsed" : "expanded"}`}>
        <Topnav toggleSideNav={hanndelDrawerCollapseToggle} toggleMobileSideNav={hanndelMobileDrawerOpenToggle} />

        {toolBarConfig.style === "fixed" ? <Mui.Toolbar className="placeholder-toolbar" /> : null}

        <Mui.Container className="cms-body container-fluid" maxWidth={false}>
          {/* {props.children} */}
          <Outlet />
        </Mui.Container>
      </main>
    </>
  );
};

export default Layout;

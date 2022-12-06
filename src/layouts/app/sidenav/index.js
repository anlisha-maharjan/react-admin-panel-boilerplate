import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import menuList from "configs/MenuList";
import { checkPermission } from "helpers";
import Drawer from "./Drawer";
import Toolbar from "./Toolbar";
import NavItem from "./NavItem";
import UserInfoCard from "./UserInfoCard";

const NavList = Mui.styled(Mui.List)(({ theme }) => ({
  padding: 0,
}));

const NavListItem = Mui.styled(Mui.ListItem)(({ theme }) => ({
  display: "block",
  marginBottom: "0.25rem",
}));

const Sidenav = (props) => {
  const { drawerOpen, handleOnCloseDrawer, handleDrawerCollapse, permissionList } = props;

  const [activePaths, setActivePaths] = React.useState({
    parent: "/",
    child: "",
  });
  const [drawerHover, setDrawerHover] = React.useState(false);

  const menuItemProps = (menu) => {
    if (menu.submenu && menu.submenu.length > 0) {
      return { component: Mui.Button, disableRipple: true };
    } else {
      return { component: Link, to: menu.path, underline: "none" };
    }
  };

  const handleOnClickParent = (parent) => {
    if (activePaths.parent !== parent) {
      setActivePaths({
        parent: parent,
        child: window.location.pathname,
      });
    } else {
      setActivePaths({
        parent: "",
        child: window.location.pathname,
      });
    }
  };

  useEffect(() => {
    // Watch for route change and upate active paths
    if (window.location.pathname) {
      const paths = window.location.pathname.split("/");
      setActivePaths({
        parent: `/${paths[1]}`,
        child: `/${paths[1]}/${paths[2]}`,
      });
    }
  }, [window.location.pathname]);

  return (
    <Drawer
      open={drawerOpen}
      handleOnCloseDrawer={handleOnCloseDrawer}
      handleOnDrawerHover={() => setDrawerHover(!drawerHover)}
    >
      <Toolbar drawerOpen={drawerOpen} handleDrawerCollapse={handleDrawerCollapse} />

      <UserInfoCard drawerOpen={drawerOpen} />

      <NavList>
        {menuList.map((menu, index) => {
          return (
            (permissionList?.some((el) => menu?.submenu?.map((res) => res.action)?.indexOf(el.name) !== -1) ||
              menu.available) && (
              <NavListItem key={menu.name} disablePadding>
                <NavItem
                  drawerOpen={drawerOpen}
                  label={menu.name}
                  icon={menu.icon}
                  hasChild={menu.submenu && menu.submenu.length > 0}
                  isActive={menu.path === activePaths.parent}
                  drawerHover={drawerHover}
                  onClick={() => {
                    handleOnClickParent(menu.path);
                    // if (Mui.isWidthDown("md", props.width) && !menu.submenu) {
                    //   hanndelDrawerOpenToggle();
                    // }
                  }}
                  {...menuItemProps(menu)}
                />

                {/*## Child Menu Listing ##*/}
                {menu.submenu && menu.submenu.length > 0 && (
                  <Mui.Collapse
                    in={(drawerOpen || drawerHover) && menu.path === activePaths.parent}
                    timeout="auto"
                    unmountOnExit
                  >
                    <NavList>
                      {menu.submenu.map((submenu) => {
                        return (
                          checkPermission(permissionList, submenu.action) && (
                            <NavListItem key={submenu.name} disablePadding>
                              <NavItem
                                drawerOpen={drawerOpen}
                                label={submenu.name}
                                icon={submenu.icon}
                                hasChild={submenu.submenu && submenu.submenu.length > 0}
                                isActive={submenu.path === activePaths.child}
                                drawerHover={drawerHover}
                                {...menuItemProps(submenu)}
                              />
                            </NavListItem>
                          )
                        );
                      })}
                    </NavList>
                  </Mui.Collapse>
                )}
              </NavListItem>
            )
          );
        })}
      </NavList>
    </Drawer>
  );
};

export default Sidenav;

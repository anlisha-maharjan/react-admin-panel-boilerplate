import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { sideNavConfig } from "src/configs/constant";

const Menu = (props) => {
  const location = useLocation();
  const theme = useTheme();
  const isWidthDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [currentPath, setCurrentPath] = useState("");
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname.split("/")[1] || window.location.pathname);
    setActivePath(props.item?.path.split("/")[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Mui.Box component="li" className={`submenu-parent ${sideNavConfig.hoverSubMenu ? "hover-menu" : ""}`}>
      <Mui.ListItem
        component={Link}
        to={props.item?.path}
        className={currentPath && activePath && currentPath === activePath ? "active" : ""}
        onClick={() => {
          isWidthDownMd && props.closeDrawer();
        }}
        // onClick={() => {
        //   Mui.isWidthDown("md", props.width) && props.closeDrawer();
        // }}
      >
        <span className="icon-menu">{props.item.icon}</span>

        <span>{props.item.title}</span>

        <span className="ml-auto pl-1 flex-shrink-0">
          {props.item?.submenu?.length > 0 && currentPath && activePath && currentPath === activePath ? (
            <ExpandLess />
          ) : props.item?.submenu?.length > 0 ? (
            <ExpandMore />
          ) : null}
        </span>
      </Mui.ListItem>

      {props.item?.submenu?.length > 0 ? (
        <Mui.Collapse
          in={currentPath && activePath && currentPath === activePath ? true : false}
          className="cms-drawer__list__submenu"
        >
          <Mui.List>
            {props.item.submenu?.map((val, j) => {
              return (
                <Mui.ListItem
                  key={j}
                  onClick={() => {
                    isWidthDownMd && props.closeDrawer();
                  }}
                  // onClick={() => {
                  //   Mui.isWidthDown("md", props.width) && props.closeDrawer();
                  // }}
                >
                  <Link to={val.path}>
                    <figure>{val.icon}</figure>
                    <span>{val.title}</span>
                  </Link>
                </Mui.ListItem>
              );
            })}
          </Mui.List>
        </Mui.Collapse>
      ) : null}
    </Mui.Box>
  );
};

export default Menu;

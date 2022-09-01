import React from "react";
import * as Mui from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconExpandedMenu, IconCollpasedMenu } from "src/components/svg";

const SideNavTriggerCollapse = (props) => {
  const theme = useTheme();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {/* Show Sidenav Open Collapse action in Large devices */}
      {/* {Mui.isWidthUp("md", props.width) ? ( */}
      {isWidthUpMd ? (
        <Mui.IconButton onClick={() => props.toggleSideNav()} size="small" className="mr-3 svg-color-toolbar-icon">
          {props.drawerCollapse ? <IconCollpasedMenu /> : <IconExpandedMenu />}
        </Mui.IconButton>
      ) : null}
    </>
  );
};

export default SideNavTriggerCollapse;

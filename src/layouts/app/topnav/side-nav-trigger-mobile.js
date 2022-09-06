import React from "react";
import * as Mui from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconExpandedMenu } from "src/components/svg";

const SideNavTriggerMobile = (props) => {
  const theme = useTheme();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {/* Open Close action Sidenav in smaller devices */}
      {/* {!Mui.isWidthUp("md", props.width) ? ( */}
      {!isWidthUpMd ? (
        <Mui.IconButton
          className="mobile-menu-toggler mr-3 svg-color-toolbar-icon"
          onClick={() => props.toggleMobileSideNav()}
          size="small"
        >
          <IconExpandedMenu />
        </Mui.IconButton>
      ) : null}
    </>
  );
};

export default SideNavTriggerMobile;

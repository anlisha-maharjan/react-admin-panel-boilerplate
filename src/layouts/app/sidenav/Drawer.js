import React from "react";
import * as Mui from "@mui/material";
import { sideNavConfig } from "configs/LayoutConfig";

const desktopOpenState = (theme) => ({
  width: sideNavConfig.drawerWidth.large,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const desktopCloseState = (theme) => ({
  width: sideNavConfig.drawerWidth.small,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const DesktopDrawer = Mui.styled(Mui.Drawer)(({ theme, open }) => ({
  width: sideNavConfig.drawerWidth.large,
  flexShrink: 0,
  position: "fixed",
  left: 0,
  top: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 1200,
  ...(open && {
    ...desktopOpenState(theme),
    "& .MuiDrawer-paper": desktopOpenState(theme),
  }),
  ...(!open && {
    ...desktopCloseState(theme),
    "& .MuiDrawer-paper": desktopCloseState(theme),

    // Expand On Hover
    "&:hover": {
      ...desktopOpenState(theme),
      "& .MuiDrawer-paper": desktopOpenState(theme),
      "& .btn-drawer-toggle": { display: "inline-flex" },
      "& .userinfo-box": {
        padding: "1rem 1.25rem",
        backgroundColor: "rgba(145, 158, 171, 0.12)",
        "& > .MuiTypography-root": { display: "block" },
      },
    },
  }),
}));

const Drawer = (props) => {
  const { window, open, handleOnCloseDrawer, handleOnDrawerHover, children } = props;

  const theme = Mui.useTheme();

  const drawerStyles = {
    "& .MuiDrawer-paper": {
      padding: "1rem",
      borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
      backgroundColor: Mui.alpha(theme.palette.body.light, 0.8),
      color: theme.palette.grey.dark,
      boxSizing: "border-box",
      backdropFilter: "blur(6px)",
    },
  };

  return (
    <>
      {/* Desktop Drawer */}
      <DesktopDrawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", xl: "block" }, // Hide Desktop Drawer Below Breakpoints xl
          ...drawerStyles,
        }}
        onMouseEnter={handleOnDrawerHover}
        onMouseLeave={handleOnDrawerHover}
      >
        {children}
      </DesktopDrawer>

      {/* Mobile Drawer */}
      <Mui.Drawer
        container={window !== undefined ? () => window().document.body : undefined}
        variant="temporary"
        open={open}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", xl: "none" }, // Hide Mobile Drawer Above Breakpoints xl
          "& .MuiDrawer-paper": { width: sideNavConfig.drawerWidth.large },
          ...drawerStyles,
        }}
        onClose={handleOnCloseDrawer}
      >
        {children}
      </Mui.Drawer>
    </>
  );
};

export default Drawer;

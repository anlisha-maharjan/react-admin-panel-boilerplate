import React from "react";
import * as Mui from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const NavItem = (props) => {
  const { label, icon, hasChild, drawerOpen, drawerHover, isActive, ...other } = props;
  const theme = Mui.useTheme();

  const styles = {
    minHeight: "initial",
    minWidth: "initial",
    width: "100%",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: drawerOpen || drawerHover ? "initial" : "center",
    padding: "0.5rem 0.75rem 0.5rem 1rem",
    borderRadius: 1.5,
    backgroundColor: isActive ? "rgba(0, 171, 85, 0.08)" : "",
    color: isActive ? theme.palette.primary.main : theme.palette.grey.dark,
    cursor: "pointer",
    textTransform: "none",
    textDecoration: "none",
    "& + .MuiCollapse-root .nav-item": {
      height: "2.5rem",
      backgroundColor: "transparent",

      "&.active": {
        color: "#000",

        "& .nav-icon": {
          color: theme.palette.primary.main,
        },
      },
    },
  };

  return (
    <Mui.Box className={`nav-item ${isActive ? "active" : ""}`} sx={styles} {...other}>
      <Mui.Box
        className="nav-icon"
        component="i"
        sx={{
          width: "1.375rem",
          height: "1.375rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: drawerOpen || drawerHover ? 2 : "auto",
        }}
      >
        {icon ? icon : <CircleIcon color="#fff" sx={{ width: isActive ? 8 : 5, heigth: isActive ? 8 : 5 }} />}
      </Mui.Box>

      {(drawerOpen || drawerHover) && (
        <Mui.Typography component="span" variant="body1" sx={{ lineHeight: 1 }}>
          {label}
        </Mui.Typography>
      )}

      {hasChild && (drawerOpen || drawerHover) && (
        <Mui.Box
          component="i"
          sx={{
            width: "1rem",
            height: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ml: "auto",
          }}
        >
          {isActive ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Mui.Box>
      )}
    </Mui.Box>
  );
};

export default NavItem;

import React from "react";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
// import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";

const iconSize = "small"; // small,medium,large,string

const MenuLists = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardTwoToneIcon fontSize={iconSize} />,
    available: true,
  },
  {
    name: "User Management",
    path: "/user-management",
    icon: <ManageAccountsTwoToneIcon fontSize={iconSize} />,
    submenu: [
      {
        action: "list role",
        name: "Role",
        path: "/user-management/role",
        icon: "",
      },
      {
        action: "list user",
        name: "User",
        path: "/user-management/user",
        icon: "",
      },
      {
        action: "list customer",
        name: "Customer",
        path: "/user-management/customer",
        icon: "",
      },
    ],
  },
  {
    name: "Configuration",
    path: "/configuration",
    icon: <SettingsTwoToneIcon fontSize={iconSize} />,
    submenu: [
      {
        action: "list configChoiceCategory",
        name: "Config Choice Category",
        path: "/configuration/config-choice-category",
        icon: "",
      },
      {
        action: "list configChoice",
        name: "Config Choice",
        path: "/configuration/config-choice",
        icon: "",
      },
    ],
  },
];

export default MenuLists;

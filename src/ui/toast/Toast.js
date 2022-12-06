import React from "react";
import * as Mui from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const ToastElement = Mui.styled(Mui.Box, { shouldForwardProp: (prop) => prop !== "color" })(
  ({ theme, color = "info" }) => ({
    height: "3.125rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.3125rem .625rem",
    border: `1px solid ${theme.palette[color].main}`,
    borderRadius: "12px",
    backgroundColor: `${Mui.lighten(theme.palette[color].main, 0.9)}`,
    color: "#555555",
    fontSize: "1rem",

    "& .icon": {
      width: "1.875rem",
      height: "1.875rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px",
      borderRadius: "10px",
      boxShadow: `0 4px 4px ${Mui.alpha(theme.palette[color].main, 0.16)}`,
      backgroundColor: theme.palette[color].main,

      "& svg": {
        width: "1.125rem",
        height: "1.125rem",
        fill: "#fff",
      },
    },
  })
);

const Toast = (props) => {
  const setToastType = (type) => {
    if (type === "primary") {
      return { icon: <CheckCircleRoundedIcon /> };
    } else if (type === "error") {
      return { icon: <ReportProblemIcon /> };
    } else if (type === "warn") {
      return { icon: <ReportProblemIcon /> };
    } else {
      return { icon: <InfoRoundedIcon /> };
    }
  };

  return (
    <ToastElement color={props.type}>
      <span className="icon">{setToastType(props.type).icon}</span>

      <Mui.Typography lineHeight={1}>{props.message}</Mui.Typography>
    </ToastElement>
  );
};
export default Toast;

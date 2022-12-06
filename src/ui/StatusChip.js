import React from "react";
import * as Mui from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const StyledChip = Mui.styled(Mui.Chip, { shouldForwardProp: (prop) => prop !== "color" })(
  ({ theme, color, variant }) => ({
    minWidth: "22px",
    height: "24px",
    gap: "8px",
    padding: "0px 8px",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: 700,
    backgroundColor:
      variant === "outlined" ? "transparent" : Mui.alpha(color ? color : theme.palette.primary.main, 0.24),
    color: color ? color : theme.palette.primary.main,

    "& .MuiChip-label": { padding: 0, "&:empty": { display: "none" } },
    "& .MuiChip-icon": { width: "18px", margin: 0, color: color ? color : theme.palette.primary.main },
  })
);

const StatusChip = (props) => {
  const { uitype = "default", label, status, ...others } = props;
  const setStatusColor = (status) => {
    if (status === "active") {
      return { color: "#038C4C", icon: <TaskAltOutlinedIcon /> };
    } else if (status === "inactive" || status === "pending") {
      return { color: "#ffab00", icon: <PendingOutlinedIcon /> };
    } else if (status === "error") {
      return { color: "#ff5630", icon: <ErrorOutlineOutlinedIcon /> };
    } else {
      return { color: "#078dee", icon: <InfoOutlinedIcon /> };
    }
  };

  return (
    <StyledChip
      icon={uitype === "with icon" || uitype === "only icon" ? setStatusColor(status).icon : <></>}
      label={uitype !== "only icon" && label ? label : ""}
      color={setStatusColor(status).color}
      {...others}
    />
  );
};
export default StatusChip;

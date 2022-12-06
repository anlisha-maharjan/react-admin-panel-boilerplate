import React from "react";
import * as Mui from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewCozyOutlinedIcon from "@mui/icons-material/ViewCozyOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PopoverDropdown from "ui/PopoverDropdown";

const Action = (props) => {
  const { permission, buttonText, handleOnDelete, handleOnEdit, handleOnView, handleOnResendVerificationCode } = props;

  const theme = Mui.useTheme();

  return (
    <PopoverDropdown dropdownWidth="150px" trigger={<MoreVertIcon />} iconColor="#888888">
      {permission?.view ? (
        <Mui.MenuItem onClick={handleOnView}>
          <ViewCozyOutlinedIcon />
          {buttonText || "View"}
        </Mui.MenuItem>
      ) : null}

      {permission?.edit ? (
        <Mui.MenuItem onClick={handleOnEdit}>
          <DriveFileRenameOutlineOutlinedIcon />
          {buttonText || "Edit"}
        </Mui.MenuItem>
      ) : null}

      {permission?.delete ? (
        <Mui.MenuItem onClick={handleOnDelete}>
          <DeleteOutlineOutlinedIcon sx={{ color: theme.palette.error.main }} />
          {buttonText || "Delete"}
        </Mui.MenuItem>
      ) : null}

      {permission?.resendCode ? (
        <Mui.MenuItem onClick={handleOnResendVerificationCode}>
          <SendOutlinedIcon />
          {buttonText || "Resend Code"}
        </Mui.MenuItem>
      ) : null}
    </PopoverDropdown>
  );
};
export default Action;

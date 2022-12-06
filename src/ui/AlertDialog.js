import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { StyledButton } from "ui";

const Dialog = Mui.styled(Mui.Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "1rem",
    boxShadow: "-40px 40px 80px -8px rgb(145, 158, 171,0.24)",
  },

  "& .MuiBackdrop-root": {
    backgroundColor: Mui.alpha(theme.palette.text.primary, 0.8),
  },
}));

const AlertDialog = (props) => {
  const { open, handleCancel, handleAction, title, info, loadingInfo, actionLabel, loading, success, reset } = props;

  const theme = Mui.useTheme();

  const onClose = (event, reason) => {
    if (reason === "backdropClick") {
      // Dont Close PopUp on Backdrop Click
      return false;
    } else {
      handleCancel();
    }
  };

  useEffect(() => {
    if (success) {
      onClose();
      reset();
    }
  }, [success]);

  return (
    <Dialog disableEscapeKeyDown={true} open={open} onClose={onClose} fullWidth={true} maxWidth={"xs"} keepMounted>
      <Mui.Typography
        component="h2"
        variant="h2"
        sx={{ p: "1.5rem 1.5rem 1rem", fontSize: "1.125rem", fontWeight: 700 }}
      >
        {title || ""}
      </Mui.Typography>
      <Mui.DialogContent sx={{ p: "0 1.5rem" }}>
        <Mui.Typography component="p">{loading ? loadingInfo : info}</Mui.Typography>
      </Mui.DialogContent>

      <Mui.DialogActions sx={{ p: "1.5rem" }}>
        <StyledButton
          isloading={loading}
          color={theme.palette.error.main}
          onClick={handleAction}
          sx={{ minHeight: "initial", mr: 1 }}
        >
          {actionLabel}
        </StyledButton>

        <StyledButton
          color={theme.palette.grey.main}
          variant="outlined"
          onClick={handleCancel}
          sx={{ minHeight: "initial", color: theme.palette.text.primary }}
        >
          Cancel
        </StyledButton>
      </Mui.DialogActions>
    </Dialog>
  );
};
export default AlertDialog;

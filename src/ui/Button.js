import React from "react";
import * as Mui from "@mui/material";

const StyledButton = Mui.styled(Mui.Button, { shouldForwardProp: (prop) => prop !== "color" })(
  ({ theme, color, variant }) => ({
    minHeight: "2.8125rem",
    gap: 8,
    padding: ".375rem 1.125rem",
    border: `1px solid ${color || theme.palette.primary.main}`,
    borderRadius: 8,
    boxShadow: `${variant === "outlined" ? "0px 3px 10px 0px" : "0px 8px 16px 0px"} ${Mui.alpha(
      color ? color : theme.palette.primary.main,
      0.24
    )}`,
    backgroundColor: variant === "outlined" ? "inherit" : color || theme.palette.primary.main,
    color:
      variant === "outlined"
        ? color || theme.palette.primary.main
        : Mui.lighten(color || theme.palette.primary.main, 1),
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.71429",
    textTransform: "none",

    "&:hover": {
      borderColor: `${color || theme.palette.primary.main}`,
      boxShadow: "none",
      backgroundColor: Mui.alpha(color ? color : theme.palette.primary.main, 0.16),
      color: color || theme.palette.primary.main,
    },

    "& .MuiCircularProgress-root": {
      color:
        variant === "outlined"
          ? color || theme.palette.primary.main
          : Mui.lighten(color || theme.palette.primary.main, 1),
    },
  })
);

const Button = (props) => {
  const { isloading, children, ...others } = props;

  return (
    <StyledButton {...others} disabled={isloading}>
      {children} {isloading ? <Mui.CircularProgress size={18} /> : ""}
    </StyledButton>
  );
};

export default Button;

import React from "react";
import * as Mui from "@mui/material";

const Checkbox = Mui.styled(Mui.Checkbox)(({ theme }) => ({
  padding: ".3125rem",
  "& + *": {
    fontSize: "0.875rem",
  },
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "transparent !important",
  },
  "& input + *": {
    borderRadius: 3,
    width: 20,
    height: 20,
  },
  "& input:disabled + *": {
    boxShadow: "inset 0 0 0 1px rgba(16,22,26,.3) !important",
    background: "rgba(206,217,224,.5) !important",
  },
  "&:not($checked)": {
    "& input + *": {
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.12), inset 0 0 0 1px rgba(16,22,26,.5)",
      backgroundColor: "#fff",
    },
    "& input:hover ~ *, & input:focus + *": {
      boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}, inset 0 -1px 0 ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
    },
    "& input + .Mui-error": {
      boxShadow: `0 1px 3px 0 ${theme.palette.getContrastText(theme.palette.error.main)}, inset 0 0 0 1px ${
        theme.palette.error.main
      }`,
    },
    "& input:hover + .Mui-error, input:focus + .Mui-error": {
      background: theme.palette.getContrastText(theme.palette.error.main),
    },
  },
  "&.Mui-checked": {
    "& input + *": {
      boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}, inset 0 -1px 0 ${theme.palette.primary.main}`,
      backgroundColor: "#fff",
      backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 20,
        height: 20,
        backgroundImage:
          `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath` +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          `1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='${theme.palette.primary.main}'/%3E%3C/svg%3E")`,
        content: '""',
      },
    },
    "& input:focus + *": {
      backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
}));

const StyledCheckbox = (props) => {
  const { ...others } = props;
  return <Mui.FormControlLabel sx={{ m: 0 }} control={<Checkbox />} {...others} />;
};

export default StyledCheckbox;

import React from "react";
import * as Mui from "@mui/material";

const StyledSpinner = (props) => {
  const { size = 40, thickness = 4, trailcolor, spinnercolor, ...others } = props;

  const theme = Mui.useTheme();

  return (
    <Mui.Box sx={{ position: "relative" }}>
      <Mui.CircularProgress
        variant="determinate"
        sx={{
          color: trailcolor || theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={size}
        thickness={thickness}
        value={100}
        {...others}
      />

      <Mui.CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: spinnercolor || (theme.palette.mode === "light" ? "#038C4C" : "#308fe8"),
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${Mui.circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={size}
        thickness={thickness}
        {...others}
      />
    </Mui.Box>
  );
};

export default StyledSpinner;

import React from "react";
import * as Mui from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconCheck, IconChevronDown } from "src/components/svg";

const Filter = (props) => {
  const theme = useTheme();
  return (
    <Mui.FormControl
      variant="outlined"
      className={`default-form-field tbl-filter-field ${useMediaQuery(theme.breakpoints.down("xs")) ? "mb-2" : "ml-2"}`}
      // className={`default-form-field tbl-filter-field ${Mui.isWidthDown("xs", props.width) ? "mb-2" : "ml-2"}`}
    >
      <Mui.TextField
        select
        variant="outlined"
        InputProps={
          props.label
            ? {
                startAdornment: <Mui.InputAdornment>{props.label}:</Mui.InputAdornment>,
              }
            : null
        }
        onChange={props.onFilter}
        value={props.value ? props.value : ""}
        SelectProps={{
          MenuProps: {
            className: "select-dropdown",
            getContentAnchorEl: null,

            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
          IconComponent: IconChevronDown,
          displayEmpty: props.displayEmpty,
        }}
      >
        {props.displayEmpty ? <Mui.MenuItem value="">All</Mui.MenuItem> : null}

        {props.options?.map((option, i) => (
          <Mui.MenuItem key={i} value={option.id}>
            {option.name}{" "}
            <span className="icon-selected">
              <IconCheck />
            </span>
          </Mui.MenuItem>
        ))}
      </Mui.TextField>
    </Mui.FormControl>
  );
};
export default Filter;

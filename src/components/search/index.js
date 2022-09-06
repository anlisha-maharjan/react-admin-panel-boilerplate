import React from "react";
import * as Mui from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props) => {
  const theme = useTheme();
  return (
    <Mui.FormControl
      variant="outlined"
      className={`tbl-filter-field ${props.fieldTheme === "dark" ? "default-form-field-dark" : "default-form-field"} ${
        useMediaQuery(theme.breakpoints.down("xs")) ? "mb-2" : ""
      }`}
      // className={`tbl-filter-field ${
      //   props.fieldTheme === "dark" ? "default-form-field-dark" : "default-form-field"
      // } ${Mui.isWidthDown("xs", props.width) ? "mb-2" : ""}`}
    >
      <Mui.OutlinedInput
        value={props.value}
        placeholder={"Search"}
        onChange={props.onSearch}
        startAdornment={
          <Mui.InputAdornment position="start">
            <SearchIcon />
          </Mui.InputAdornment>
        }
      />
    </Mui.FormControl>
  );
};
export default Search;

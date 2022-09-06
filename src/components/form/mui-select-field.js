import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";
import { IconCheck, IconChevronDown } from "src/components/svg";

const MuiSelectField = ({
  label,
  options,
  variant,
  shrinkLabel = true,
  readonlyArr = [],
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Mui.FormControl
      error={meta.touched && meta.error ? true : false}
      variant={variant ? variant : "outlined"}
    >
      <Mui.InputLabel shrink={shrinkLabel} htmlFor="select">
        {label}
      </Mui.InputLabel>
      <Mui.Select
        {...field}
        {...props}
        IconComponent={IconChevronDown}
        MenuProps={{
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
        }}
      >
        {options?.map((item, index) => {
          return (
            <Mui.MenuItem
              disabled={readonlyArr.indexOf(item.id) > -1}
              key={index}
              value={item.id}
            >
              {item.name}
              <span className="icon-selected">
                <IconCheck />
              </span>
            </Mui.MenuItem>
          );
        })}
      </Mui.Select>
      {meta.touched && meta.error ? (
        <Mui.FormHelperText error>
          {meta.touched && meta.error ? meta.error : null}
        </Mui.FormHelperText>
      ) : null}
    </Mui.FormControl>
  );
};

export default MuiSelectField;

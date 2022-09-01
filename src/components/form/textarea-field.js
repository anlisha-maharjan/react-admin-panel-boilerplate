import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";

const TextareaField = ({
  label,
  rowsMax = "",
  shrinkLabel = true,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Mui.TextField
      multiline
      rows={3}
      rowsMax={rowsMax}
      label={label ? label : null}
      variant="outlined"
      helperText={
        <span className="d-flex justify-content-between">
          <span>{meta.touched && meta.error ? meta.error : ""}</span>
        </span>
      }
      error={meta.touched && meta.error ? true : false}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      {...field}
      {...props}
    />
  );
};

export default TextareaField;

import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";

const InputField = ({ label, variant, shrinkLabel = true, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Mui.TextField
      label={label ? label : null}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      variant={variant ? variant : "outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
      error={meta.touched && meta.error ? true : false}
      {...field}
      {...props}
    />
  );
};

export default InputField;

import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";
import InputFieldStyles from "styles/form/InputField.style";

const InputField = ({ label, variant, shrinkLabel = false, ...props }) => {
  const [field, meta] = useField(props);

  const FieldStyles = InputFieldStyles();

  return (
    <Mui.TextField
      label={label || null}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      variant={variant || "outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
      error={meta.touched && meta.error ? true : false}
      margin="dense"
      fullWidth
      sx={FieldStyles}
      {...field}
      {...props}
    />
  );
};

export default InputField;

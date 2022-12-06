import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";
import InputFieldStyles from "styles/form/InputField.style";

const TextareaField = ({ label, shrinkLabel = false, ...props }) => {
  const FieldStyles = InputFieldStyles();

  const [field, meta] = useField(props);

  return (
    <Mui.TextField
      multiline
      rows={3}
      label={label || null}
      variant="outlined"
      helperText={
        <span className="d-flex justify-content-between">
          <span>{meta.touched && meta.error ? meta.error : ""}</span>
        </span>
      }
      error={meta.touched && meta.error ? true : false}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      margin="dense"
      fullWidth
      sx={FieldStyles}
      {...field}
      {...props}
    />
  );
};

export default TextareaField;

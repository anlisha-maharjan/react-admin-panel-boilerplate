import React, { useState } from "react";
import * as Mui from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useField } from "formik";
import InputFieldStyles from "styles/form/InputField.style";

const InputPasswordField = ({ label, variant, shrinkLabel = false, ...props }) => {
  const FieldStyles = InputFieldStyles();

  const [field, meta] = useField(props);
  const [type, setType] = useState("password");

  const pwdToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <Mui.TextField
      type={type}
      label={label || null}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      InputProps={{
        endAdornment: (
          <Mui.InputAdornment position="end">
            <Mui.IconButton onClick={pwdToggle} edge="end">
              {type === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Mui.IconButton>
          </Mui.InputAdornment>
        ),
      }}
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

export default InputPasswordField;

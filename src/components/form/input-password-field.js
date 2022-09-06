import React, { useState } from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";
import { IconEye, IconEyeOff } from "src/components/svg";

const InputPasswordField = ({
  label,
  variant,
  shrinkLabel = true,
  ...props
}) => {
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
      label={label ? label : null}
      InputLabelProps={shrinkLabel ? { shrink: true } : {}}
      InputProps={{
        endAdornment: (
          <Mui.InputAdornment position="end">
            <Mui.IconButton onClick={pwdToggle} edge="end">
              {type === "password" ? <IconEyeOff /> : <IconEye />}
            </Mui.IconButton>
          </Mui.InputAdornment>
        ),
      }}
      variant={variant ? variant : "outlined"}
      helperText={meta.touched && meta.error ? meta.error : null}
      error={meta.touched && meta.error ? true : false}
      {...field}
      {...props}
    />
  );
};

export default InputPasswordField;

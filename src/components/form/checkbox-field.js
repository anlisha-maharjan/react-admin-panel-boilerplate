import React from "react";
import * as Mui from "@mui/material";
import { useField } from "formik";

const CheckboxField = ({ label, ui = "default", callback, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <Mui.FormControl error={meta.touched && meta.error ? true : false}>
      <Mui.FormControlLabel
        classes={{ label: `w-100 d-flex ${ui === "dark" ? "text-color-primary" : ""}` }}
        className={`d-flex m-0 translate-y-0 ${ui === "dark" ? "default-checkbox-dark" : "default-checkbox"}`}
        control={
          <Mui.Checkbox
            {...field}
            className={`${ui !== "dark" ? "default-checkbox mr-1" : ""}`}
            checked={field.value === 1 ? true : false}
            onChange={(event) => {
              const value = event.target.checked ? 1 : 0;
              helpers.setValue(value);
              if (callback) {
                callback(value);
              }
            }}
          />
        }
        label={label}
      />

      {meta.touched && meta.error ? (
        <Mui.FormHelperText error style={{ margin: "0" }}>
          {meta.error}
        </Mui.FormHelperText>
      ) : null}
    </Mui.FormControl>
  );
};

export default CheckboxField;

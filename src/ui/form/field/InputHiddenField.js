import React from "react";
import { useField } from "formik";

const InputHiddenField = ({ ...props }) => {
  const [field] = useField(props);
  return <input type="hidden" {...field} {...props} />;
};

export default InputHiddenField;

import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";

const SelectField = ({ options, label, callback, disableClearable = true, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [selectedVal, setSelectedVal] = useState("");

  useEffect(() => {
    setSelectedVal(options?.find((x) => x.id === field?.value) || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, field.value]);

  const handleSelectChange = (event, selectedOption) => {
    if (selectedOption?.id) {
      helpers.setValue(selectedOption.id);
      if (callback) {
        callback(selectedOption?.id);
      }
    }
  };

  return (
    <>
      <Autocomplete
        options={options || []}
        autoHighlight
        autoComplete={true}
        disableClearable={disableClearable}
        getOptionLabel={(option) => option?.name || option?.firstName || option?.code || ""}
        value={selectedVal}
        onChange={handleSelectChange}
        renderOption={(option, { selected }) => (
          <div className="select-item">{option?.name || option?.firstName || option?.code || ""}</div>
        )}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <Mui.TextField
            {...params}
            error={meta.touched && meta.error ? true : false}
            placeholder={props?.placeholder || ""}
            inputProps={{
              ...params.inputProps,
              autoComplete: "nofill",
            }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={label}
          />
        )}
      />
      {meta.touched && meta.error ? (
        <Mui.FormHelperText error>{meta.touched && meta.error ? meta.error : null}</Mui.FormHelperText>
      ) : null}
    </>
  );
};

export default SelectField;

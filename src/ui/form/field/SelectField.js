import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";
import InputFieldStyles from "styles/form/InputField.style";
import SelectFieldStyles from "styles/form/SelectField.style";

const SelectField = ({ options, label, callback, disableClearable = true, ...props }) => {
  const theme = Mui.useTheme();
  const FieldStyles = InputFieldStyles();
  const SelectStyles = SelectFieldStyles(theme);

  const [field, meta, helpers] = useField(props);
  const [selectedVal, setSelectedVal] = useState(null);

  useEffect(() => {
    setSelectedVal(options?.find((x) => x.id === field?.value) || null);
  }, [options, field.value]);

  const handleSelectChange = (event, selectedOption) => {
    if (selectedOption?.id) {
      helpers.setValue(selectedOption.id);
      if (callback) {
        callback(selectedOption.id);
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
        getOptionLabel={(option) => option?.name || ""}
        value={selectedVal}
        onChange={handleSelectChange}
        componentsProps={{ popper: { sx: SelectStyles.paper } }}
        renderOption={(props, option) => (
          <Mui.MenuItem className="select-item" {...props}>
            {option?.name || ""}
          </Mui.MenuItem>
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disabled={props?.disabled}
        sx={SelectStyles.root}
        renderInput={(params) => (
          <Mui.TextField
            {...params}
            error={meta.touched && meta.error ? true : false}
            placeholder={props?.placeholder || ""}
            inputProps={{
              ...params.inputProps,
              autoComplete: "nofill",
            }}
            sx={FieldStyles}
            margin="dense"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={label}
          />
        )}
      />
      {meta.touched && meta.error && (
        <Mui.FormHelperText error>{meta.touched && meta.error ? meta.error : null}</Mui.FormHelperText>
      )}
    </>
  );
};

export default SelectField;

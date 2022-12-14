import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useField } from "formik";
import InputFieldStyles from "styles/form/InputField.style";
import SelectFieldStyles from "styles/form/SelectField.style";

const InputGoogleField = ({ label, placeholder, shrinkLabel = false, ...props }) => {
  const theme = Mui.useTheme();
  const FieldStyles = InputFieldStyles();
  const SelectStyles = SelectFieldStyles(theme);

  const [field, meta, handler] = useField(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperWidth, setPopperWidth] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!popperWidth) {
      setPopperWidth(event.currentTarget.getBoundingClientRect().width);
    }
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: {
        country: "au",
      },
    },
    debounce: 200,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    const val = e.target.value;
    setValue(val);
    handleClick(e);
  };

  const clickAwayHandler = () => {
    clearSuggestions();
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      handler.setValue(description);
      clearSuggestions();
    };

  useEffect(() => {
    field?.value ? setValue(field.value, false) : setValue("", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Mui.MenuItem
          key={place_id}
          onClick={handleSelect(suggestion)}
          sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
        >
          <LocationOnIcon />

          <Mui.Box component="span" sx={{ "& .MuiTypography-root": { display: "block", whiteSpace: "normal" } }}>
            <Mui.Typography variant="body1" component="span" className="d-block font-weight-medium">
              {main_text}
            </Mui.Typography>
            <Mui.Typography variant="body2" color="textSecondary" component="small">
              {secondary_text}
            </Mui.Typography>
          </Mui.Box>
        </Mui.MenuItem>
      );
    });

  return (
    <>
      <Mui.TextField
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder || null}
        label={label}
        variant={"outlined"}
        InputLabelProps={shrinkLabel ? { shrink: true } : {}}
        helperText={meta.touched && meta.error ? meta.error : null}
        error={meta.touched && meta.error ? true : false}
        margin="dense"
        fullWidth
        sx={FieldStyles}
        {...props}
      />
      {status === "OK" && (
        <Mui.ClickAwayListener onClickAway={clickAwayHandler}>
          <Mui.Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            className="popper-dropdown"
            style={{ width: popperWidth || "auto" }}
          >
            <Mui.Box sx={SelectStyles.paper}>
              <Mui.Paper sx={{ maxWidth: popperWidth || "auto" }}>{renderSuggestions()}</Mui.Paper>
            </Mui.Box>
          </Mui.Popper>
        </Mui.ClickAwayListener>
      )}
    </>
  );
};

export default InputGoogleField;

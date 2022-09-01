import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GoogleAutoComplete = ({
  label,
  variant,
  placeholder,
  touched,
  error,
  defaultValue = null,
  shrinkLabel = true,
  callback,
  ...props
}) => {
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
    let val = e.target.value;
    setValue(e.target.value);
    handleClick(e);
    if (!val) {
      if (callback) {
        callback("");
      }
    }
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
      clearSuggestions();
      if (callback) {
        callback(description);
      }
    };

  useEffect(() => {
    defaultValue ? setValue(defaultValue, false) : setValue("", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Mui.MenuItem key={place_id} onClick={handleSelect(suggestion)}>
          <Mui.Box display="flex" alignItems="flex-start" component="div">
            <Mui.Box component="div" className="flex-shrink-0 mr-1">
              <LocationOnIcon />
            </Mui.Box>
            <Mui.Box component="div">
              <Mui.Typography
                variant="body1"
                component="span"
                className="d-block font-weight-medium"
                style={{ whiteSpace: "normal" }}
              >
                {main_text}
              </Mui.Typography>
              <Mui.Typography
                variant="body2"
                color="textSecondary"
                component="small"
                className="d-block font-weight-medium"
                style={{ whiteSpace: "normal" }}
              >
                {secondary_text}
              </Mui.Typography>
            </Mui.Box>
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
        label={label ? label : null}
        variant={variant ? variant : "outlined"}
        InputLabelProps={shrinkLabel ? { shrink: true } : {}}
        helperText={touched && error ? error : null}
        error={touched && error ? true : false}
        fullWidth
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
            {renderSuggestions()}
          </Mui.Popper>
        </Mui.ClickAwayListener>
      )}
    </>
  );
};

export default GoogleAutoComplete;

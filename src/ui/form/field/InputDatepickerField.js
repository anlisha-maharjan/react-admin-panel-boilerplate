import React, { useState, useEffect } from "react";
import { useField } from "formik";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";

const InputDatepickerField = ({ label, callback, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepicker, setDatepicker] = useState(false);

  useEffect(() => {
    setSelectedDate(field?.value || null);
  }, [field.value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    helpers.setValue(moment(date).format("YYYY-MM-DD"));
    if (callback) {
      callback();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        className={`date-time-picker`}
        InputProps={{ readOnly: true }}
        autoOk
        disableToolbar
        variant="inline"
        fullWidth
        minDate={new Date()}
        inputVariant="outlined"
        format="dd-MM-yyyy"
        margin="normal"
        onClick={() => setDatepicker(true)}
        onClose={() => setDatepicker(false)}
        open={datepicker}
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        keyboardIcon={null}
        helperText={meta.touched && meta.error ? meta.error : null}
        error={meta.touched && meta.error ? true : false}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default InputDatepickerField;

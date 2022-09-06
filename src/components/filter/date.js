import React, { useState } from "react";
import * as Mui from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const DateFilter = (props) => {
  const [datepicker, setDatepicker] = useState(false);
  return (
    <Mui.FormControl variant="outlined" className={`default-form-field tbl-filter-field`} style={{ maxWidth: "47%" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          className={`date-time-picker`}
          autoOk
          disableToolbar
          variant="inline"
          fullWidth
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          minDate={props.minDate ? new Date(props.minDate) : new Date("1990-01-01")}
          onClick={() => setDatepicker(true)}
          onClose={() => setDatepicker(false)}
          open={datepicker}
          label=""
          value={props.filterValue}
          onChange={props.onFilter}
          keyboardIcon={null}
          InputProps={{ readOnly: true, startAdornment: <Mui.InputAdornment>{props.label}:</Mui.InputAdornment> }}
        />
      </LocalizationProvider>
    </Mui.FormControl>
  );
};

export default DateFilter;

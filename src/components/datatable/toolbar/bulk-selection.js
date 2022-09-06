import React from "react";
import * as Mui from "@mui/material";
import { IconTrash } from "src/components/svg";

const BulkSelection = (props) => {
  const { selected, onDelete } = props;

  return (
    <div className="selected-items">
      <Mui.Typography color="inherit" variant="subtitle1" component="span">
        {selected} selected
      </Mui.Typography>

      <Mui.IconButton
        variant="outlined"
        className="btn-icon-square svg-color-danger border-color-danger ml-2"
        onClick={onDelete}
      >
        <IconTrash />
      </Mui.IconButton>
    </div>
  );
};

export default BulkSelection;

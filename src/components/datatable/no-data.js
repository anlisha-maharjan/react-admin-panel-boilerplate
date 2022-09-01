import React from "react";
import * as Mui from "@mui/material";

const TableNoData = () => {
  return (
    <Mui.TableRow>
      <Mui.TableCell colSpan="12" className="nodata">
        No Records Found
      </Mui.TableCell>
    </Mui.TableRow>
  );
};
export default TableNoData;

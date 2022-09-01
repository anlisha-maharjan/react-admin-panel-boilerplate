import React from "react";
import * as Mui from "@mui/material";

const TableLoader = () => {
  return (
    <Mui.TableRow>
      <Mui.TableCell colSpan="12" className="nodata">
        <Mui.CircularProgress color="inherit" style={{ margin: "10rem 0" }} />
      </Mui.TableCell>
    </Mui.TableRow>
  );
};
export default TableLoader;

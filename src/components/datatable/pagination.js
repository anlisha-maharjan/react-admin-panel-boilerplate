import React from "react";
import * as Mui from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";

const TablePagination = (props) => {
  const theme = useTheme();
  const { page, totalPage, totalItem, start, end, handleChangePage, pageSize, handleChangePageSize } = props;
  return (
    <Mui.Box
      className={`pagination-datatable ${props.displayTheme === "dark" ? "dark" : ""}`}
      width="100%"
      display="flex"
      // flexDirection={Mui.isWidthDown("xs", props.width) ? "column" : "row"}
      flexDirection={useMediaQuery(theme.breakpoints.down("xs")) ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Mui.Typography component="h5" variant="h5" className="page-info">
        Showing {start} – {end} from {totalItem} data
      </Mui.Typography>

      <Mui.Box
        display="flex"
        // flexWrap={Mui.isWidthDown("xs", props.width) ? "wrap" : "no-wrap"}
        flexWrap={useMediaQuery(theme.breakpoints.down("xs")) ? "wrap" : "no-wrap"}
        alignItems="center"
        // justifyContent={Mui.isWidthDown("xs", props.width) ? "space-between" : "flex-start"}
        justifyContent={useMediaQuery(theme.breakpoints.down("xs")) ? "space-between" : "flex-start"}
        className="pagination-card"
      >
        <Mui.Typography component="h5" variant="h5">
          Items per page
        </Mui.Typography>

        <Mui.Select value={pageSize} onChange={handleChangePageSize} label="">
          <Mui.MenuItem value={10}>10</Mui.MenuItem>
          <Mui.MenuItem value={25}>25</Mui.MenuItem>
          <Mui.MenuItem value={50}>50</Mui.MenuItem>
        </Mui.Select>

        <Pagination page={page} onChange={handleChangePage} count={totalPage} variant="outlined" shape="rounded" />
      </Mui.Box>
    </Mui.Box>
  );
};
export default TablePagination;

import React from "react";
import * as Mui from "@mui/material";
import moment from "moment";
import TableHeader from "./header";
import TablePagination from "./pagination";
import TableRow from "./table-row";
import TableToolbar from "./toolbar";
import TableNoData from "./no-data";
import TableLoader from "./loader";

export default function DataTable(props) {
  const { enableRowClick } = props;

  const [tableStyle] = React.useState(
    props?.tableStyle || "card" // option default, card
  );
  const [actionStyle] = React.useState(props?.actionStyle || "icons");
  const [sortOrder, setSortOrder] = React.useState("");
  const [activeCol, setActiveCol] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [fromDateFilter, setFromDateFilter] = React.useState(null);
  const [toDateFilter, setToDateFilter] = React.useState(null);
  const [typingTimeout, setTypingTimeout] = React.useState(0);
  const [actionMenu, setActionMenu] = React.useState(null);
  const [actionMenuId, setActionMenuId] = React.useState(null);

  const handleOpenAlert = (id) => {
    props.handleOpenAlert(id);
    setActionMenu(null);
    setActionMenuId(null);
  };

  const handleDownload = (id, bookingNumber) => {
    props.onDownload(id, bookingNumber);
    setActionMenu(null);
    setActionMenuId(null);
  };

  const handleOpenAlert1 = () => {
    props.handleOpenAlert1(selected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = activeCol === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setActiveCol(property);
    props.onChange(search, isAsc ? "desc" : "asc", page, pageSize, property, fromDateFilter, toDateFilter);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.onChange(search, sortOrder, newPage, pageSize, activeCol, fromDateFilter, toDateFilter);
  };

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
    props.onChange(search, sortOrder, 1, parseInt(event.target.value, 10), activeCol, fromDateFilter, toDateFilter);
  };

  const handleSearch = (event) => {
    let val = event.target.value;
    setSearch(event.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(function () {
        props.onChange(val, sortOrder, page, pageSize, activeCol, fromDateFilter, toDateFilter);
      }, 1000)
    );
  };

  const handleFromDateFilter = (value) => {
    setFromDateFilter(moment(value).format("YYYY-MM-DD"));
    setToDateFilter(null);
    props.onChange(search, sortOrder, page, pageSize, activeCol, moment(value).format("YYYY-MM-DD"), null);
  };

  const handleToDateFilter = (value) => {
    setToDateFilter(moment(value).format("YYYY-MM-DD"));
    props.onChange(search, sortOrder, page, pageSize, activeCol, fromDateFilter, moment(value).format("YYYY-MM-DD"));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleOpenActionMenu = (event, id) => {
    setActionMenu(event.currentTarget);
    setActionMenuId(id);
  };

  const handleCloseActionMenu = () => {
    setActionMenu(null);
    setActionMenuId(null);
  };

  const handleCustomAction = (id) => {
    props.handleCustomAction(id);
    setActionMenu(null);
    setActionMenuId(null);
  };

  return (
    <>
      <Mui.Box className={`table-wrapper ${tableStyle}`} elevation={0}>
        <TableToolbar
          title={props.title}
          numSelected={selected.length}
          search={search}
          fromDateFilter={fromDateFilter}
          toDateFilter={toDateFilter}
          handleSearch={handleSearch}
          handleFromDateFilter={handleFromDateFilter}
          handleToDateFilter={handleToDateFilter}
          permission={props.permission}
          route={props.route}
          createLabel={props.createLabel}
          handleOpenAlert1={handleOpenAlert1}
          headCells={props.headCells}
          enableColumnFilter={props.enableColumnFilter}
          enableDateRangeFilter={props.enableDateRangeFilter}
        />

        <Mui.TableContainer className="default-datatable">
          <Mui.Table size={"medium"}>
            <TableHeader
              numSelected={selected.length}
              sortOrder={sortOrder}
              activeCol={activeCol}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              headCells={props.headCells}
              enableCheckbox={props.enableCheckbox}
              hideAction={props.hideAction || false}
            />

            <Mui.TableBody>
              {props.loading ? (
                <TableLoader />
              ) : (
                <>
                  {props.rows &&
                    props.rows.length > 0 &&
                    props.rows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          key={index}
                          isItemSelected={isItemSelected}
                          labelId={labelId}
                          row={row}
                          handleClick={handleClick}
                          headCells={props.headCells}
                          index={index}
                          handleOpenActionMenu={handleOpenActionMenu}
                          actionMenu={actionMenu}
                          actionMenuId={actionMenuId}
                          handleCloseActionMenu={handleCloseActionMenu}
                          handleOpenAlert={handleOpenAlert}
                          handleOpenModal={props.handleOpenModal}
                          handleCustomAction={handleCustomAction}
                          handleDownload={handleDownload}
                          permission={props.permission}
                          route={props.route}
                          actionStyle={actionStyle}
                          enableCheckbox={props.enableCheckbox}
                          enableRowClick={enableRowClick}
                        />
                      );
                    })}
                  {props.rows && props.rows.length === 0 && <TableNoData />}
                </>
              )}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
      </Mui.Box>
      <TablePagination
        page={page}
        totalPage={props.totalPage}
        totalItem={props.totalItem}
        start={props.start}
        end={props.end}
        handleChangePage={handleChangePage}
        pageSize={pageSize}
        handleChangePageSize={handleChangePageSize}
      />
    </>
  );
}

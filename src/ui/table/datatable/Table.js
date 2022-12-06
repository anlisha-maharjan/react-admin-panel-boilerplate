import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { StyledSpinner } from "ui";

const TableResponsive = Mui.styled(Mui.Box)(({ theme }) => ({
  minHeight: "10rem",
  width: "100%",
  position: "relative",
  padding: "0 .625rem",
  overflow: "auto",
}));

const TableWrapper = Mui.styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: "0",
}));

const TableHead = Mui.styled("thead")(({ theme }) => ({
  width: "100%",
  "& tr th": {
    backgroundColor: "#f4f6f8",
    "&:first-of-type": {
      borderRadius: "8px 0 0 8px",
    },
    "&:last-of-type": {
      borderRadius: "0 8px 8px 0",
    },
  },
}));

const TableItem = Mui.styled(Mui.Box)(({ theme }) => ({
  padding: "1rem",
  fontSize: ".875rem",
  lineHeight: "1.5rem",

  "&:not(td)": {
    color: theme.palette.grey.dark,
    fontWeight: "600",
  },
}));

const Table = (props) => {
  const {
    classes,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    loading,
    selectionRow,
    emptyMsg,
    handleSort,
    handleRowClick,
    totalPage,
  } = props;

  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRow, setSelectedRow] = useState(selectionRow);

  const onSort = (value, key) => {
    const order = key !== undefined ? (key ? "desc" : "asc") : sortOrder;
    setSortOrder(order);
    handleSort(order, value);
  };

  useEffect(() => {
    setSelectedRow(selectionRow);
  }, [selectionRow]);

  return (
    <TableResponsive className={`${classes?.root || ""}`}>
      <TableWrapper {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <TableItem
                  key={j}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  component="th"
                  width={column.id === "selection" || column.id === "expander" ? "25" : ""}
                  className={`${classes?.head || ""}`}
                >
                  <Mui.Typography
                    sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
                    className={`
                    ${column.render("Header") === "Actions" ? "justify-end" : ""}`}
                    onClick={() => {
                      column?.canSort && totalPage > 1 && onSort(column?.id, column.isSortedDesc);
                    }}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (
                      <Mui.Typography component="i" lineHeight="1">
                        {column.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="16px" />
                        ) : (
                          <ArrowUpwardIcon fontSize="16px" />
                        )}
                      </Mui.Typography>
                    ) : null}
                  </Mui.Typography>
                </TableItem>
              ))}
            </tr>
          ))}
        </TableHead>

        <tbody className={`${classes?.tbody || ""}`} {...getTableBodyProps()}>
          {page?.length > 0 &&
            page.map((row) => {
              return (
                prepareRow(row) || (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    // eslint-disable-next-line react/no-unknown-property
                    index={row.id}
                    className={`
                ${row.values?.groupName ? "group" : "columns"} ${row.isExpanded ? "expanded" : ""} 
                ${!row.values?.groupName && row.values?.groupName !== "" ? "group-child" : ""}
                ${selectedRow?.includes(row?.id) ? "bg-green-500 text-white svg-white" : ""}
                `}
                    onClick={() => {
                      handleRowClick && handleRowClick(row);
                    }}
                  >
                    {row.cells.map((cell, k) => {
                      return (
                        <TableItem
                          component="td"
                          key={k}
                          {...cell.getCellProps()}
                          className={`
                        ${cell?.column?.Header === "Actions" ? "text-right" : "text-left"}`}
                        >
                          {cell.render("Cell")}
                        </TableItem>
                      );
                    })}
                  </tr>
                )
              );
            })}

          {!loading && page?.length === 0 && (
            <tr>
              <TableItem
                component="td"
                colSpan={headerGroups[0].headers.length}
                className="text-gray-600 text-sm text-center"
              >
                {emptyMsg || "No Data"}
              </TableItem>
            </tr>
          )}
        </tbody>
      </TableWrapper>

      {loading && (
        <Mui.Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "rgba(255,255,255,0.65)",
          }}
          className="backdrop-blur-sm"
        >
          <StyledSpinner />
        </Mui.Box>
      )}
    </TableResponsive>
  );
};

export default Table;

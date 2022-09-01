import React from "react";
import * as Mui from "@mui/material";

const TableHeader = (props) => {
  const {
    onSelectAllClick,
    sortOrder,
    activeCol,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    enableCheckbox,
    hideAction,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <Mui.TableHead>
      <Mui.TableRow>
        {enableCheckbox ? (
          <Mui.TableCell padding="checkbox">
            <Mui.Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </Mui.TableCell>
        ) : null}

        {headCells &&
          headCells.map((headCell) => (
            <Mui.TableCell
              key={headCell.sortKey}
              sortDirection={activeCol === headCell.sortKey ? sortOrder : false}
            >
              <Mui.TableSortLabel
                active={activeCol === headCell.sortKey}
                direction={activeCol === headCell.sortKey ? sortOrder : "asc"}
                onClick={createSortHandler(headCell.sortKey)}
              >
                {headCell.label}
              </Mui.TableSortLabel>
            </Mui.TableCell>
          ))}
        {!hideAction ? (
          <Mui.TableCell align={"left"} padding={"normal"}>
            ACTIONS
          </Mui.TableCell>
        ) : null}
      </Mui.TableRow>
    </Mui.TableHead>
  );
};
export default TableHeader;

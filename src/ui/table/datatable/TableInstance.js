import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy, useRowSelect, useExpanded, sortTypes } from "react-table";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IndeterminateCheckbox } from "ui";

const TableInstance = (props) => {
  const {
    columns,
    data,
    permission,
    currentPage,
    totalPage,
    hiddenColumns,
    selectionColumn,
    collapsibleColumn,
    classes,
    total,
  } = props;

  const hiddenColumnsList = useMemo(() => {
    if (hiddenColumns && hiddenColumns.length > 0) {
      return hiddenColumns;
    } else {
      return [];
    }
  }, [hiddenColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageOptions,
    selectedFlatRows,
    toggleAllRowsSelected,
    setSortBy,
    state: { pageIndex, sortBy, expanded },
  } = useTable(
    {
      columns,
      data,
      permission,
      // getRowId,
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: currentPage,
          }),
          [state, currentPage]
        );
      },
      manualSortBy: totalPage === 1 ? false : true,
      autoResetPage: false,
      autoResetSortBy: true,
      initialState: {
        pageIndex: currentPage,
        hiddenColumns: ["id", !selectionColumn && "selection", !collapsibleColumn && "expander", ...hiddenColumnsList],
      },
      manualPagination: true,
      pageCount: totalPage,
      disableSortRemove: true,
      sortTypes,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          disableSortBy: true,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ toggleRowSelected, isAllPageRowsSelected, page }) => {
            const modifiedOnChange = (event) => {
              page.forEach((row) => {
                //check each row if it is not disabled
                !row.original.disabled && toggleRowSelected(row.id, event.currentTarget.checked);
              });
            };

            let selectableRowsInCurrentPage = 0;
            let selectedRowsInCurrentPage = 0;

            page.forEach((row) => {
              row.isSelected && selectedRowsInCurrentPage++;
              !row.original.disabled && selectableRowsInCurrentPage++;
            });

            //If there are no selectable rows in the current page
            //select all checkbox will be disabled -> see page 2
            const disabled = selectableRowsInCurrentPage === 0;
            const checked =
              (isAllPageRowsSelected || selectableRowsInCurrentPage === selectedRowsInCurrentPage) && !disabled;

            return <IndeterminateCheckbox onChange={modifiedOnChange} checked={checked} disabled={disabled} />;
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <span className="block -ml-5">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} disabled={row.original.disabled} />
            </span>
          ),
        },
        {
          // Build our expander column
          id: "expander", // Make sure it has an ID
          // Header: "",
          // Use this in Header to have expand all option in header.
          // ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          //   <span {...getToggleAllRowsExpandedProps()}>
          //     {isAllRowsExpanded ? "👇" : "👉"}
          //   </span>
          // )
          Cell: ({ row }) => {
            return (
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <i
                  {...row.getToggleRowExpandedProps()}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EBEBEB] svg-xss svg-secondary"
                >
                  {row.isExpanded ? <RemoveIcon /> : <AddIcon />}
                </i>
              ) : null
            );
          },
        },

        ...columns,
      ]);
    }
  );

  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        sortBy,
        pageLength: pageOptions?.length,
        pageIndex,
        selectedFlatRows,
        toggleAllRowsSelected,
        expanded,
        totalPage,
        setSortBy,
        total,
        rows,
      });
    }
    return child;
  });

  return <div className={`table-wrapper ${classes || ""}`}>{childrenWithProps}</div>;
};

export default TableInstance;

import React, { useState } from "react";
import * as Mui from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconAdd, IconGear } from "src/components/svg";
import Search from "src/components/search";
import { DateFilter } from "src/components/filter";
import ColumnFilter from "./column-filter";
import BulkSelection from "./bulk-selection";

const TableToolbar = (props) => {
  const theme = useTheme();
  const {
    title,
    numSelected,
    search,
    fromDateFilter,
    toDateFilter,
    handleSearch,
    handleFromDateFilter,
    handleToDateFilter,
    permission,
    route,
    createLabel,
    handleOpenAlert1,
    headCells,
    enableColumnFilter,
    enableDateRangeFilter,
  } = props;
  // const [showFilter, setShowFilter] = useState(Mui.isWidthUp("md", props.width));
  const [showFilter, setShowFilter] = useState(useMediaQuery(theme.breakpoints.up("md")));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Mui.Toolbar className="datatable-filter-bar">
      <Mui.Typography
        component="h3"
        variant="h3"
        // className={`title ${Mui.isWidthDown("sm", props.width) ? "align-self-start" : "center"}`}
        className={`title ${useMediaQuery(theme.breakpoints.down("sm")) ? "align-self-start" : "center"}`}
      >
        {title}
      </Mui.Typography>

      <Mui.Box
        width="100%"
        display="flex"
        // flexWrap={Mui.isWidthDown("sm", props.width) ? "wrap" : "no-wrap"}
        flexWrap={useMediaQuery(theme.breakpoints.down("sm")) ? "wrap" : "no-wrap"}
        // justifyContent={`${Mui.isWidthDown("xs", props.width) ? "center" : "flex-end"}`}
        justifyContent={`${useMediaQuery(theme.breakpoints.down("xs")) ? "center" : "flex-end"}`}
        alignItems="center"
        // className={`filter-bar-right ${Mui.isWidthDown("xs", props.width) ? "mt-2" : ""}`}
        className={`filter-bar-right ${useMediaQuery(theme.breakpoints.down("xs")) ? "mt-2" : ""}`}
      >
        <Mui.Collapse
          in={showFilter || isWidthUpMd}
          // in={showFilter || Mui.isWidthUp("md", props.width)}
          classes={{
            wrapperInner: `d-flex justify-content-end ${
              useMediaQuery(theme.breakpoints.down("xs")) ? "flex-direction-column" : "row flex-wrap"
            }`,
            // wrapperInner: `d-flex justify-content-end ${
            //   Mui.isWidthDown("xs", props.width) ? "flex-direction-column" : "row flex-wrap"
            // }`,
          }}
        >
          <Search value={search} onSearch={handleSearch} />

          {enableDateRangeFilter ? (
            <Mui.Box
              width={isWidthDownXs ? "100%" : "500px"}
              // width={Mui.isWidthDown("xs", props.width) ? "100%" : "500px"}
              display="flex"
              flexWrap={"wrap"}
              gridGap="1.6rem"
              ml={isWidthDownXs ? "" : "1.6rem"}
              mt={isWidthDownXs ? "1.6rem" : ""}
              // ml={Mui.isWidthDown("xs", props.width) ? "" : "1.6rem"}
              // mt={Mui.isWidthDown("xs", props.width) ? "1.6rem" : ""}
            >
              <DateFilter label="From" filterValue={fromDateFilter} onFilter={handleFromDateFilter} />
              <DateFilter
                label="To"
                filterValue={toDateFilter}
                onFilter={handleToDateFilter}
                minDate={fromDateFilter}
              />
            </Mui.Box>
          ) : null}
        </Mui.Collapse>

        <Mui.Hidden smUp>
          <Mui.Divider light={true} className="w-100 mb-1" />
        </Mui.Hidden>

        {/* Bulk Selection Action */}
        {numSelected > 0 ? <BulkSelection selected={numSelected} onDelete={() => handleOpenAlert1()} /> : null}

        {numSelected === 0 ? (
          <>
            {permission?.add ? (
              <Mui.Button
                color="primary"
                size="small"
                disableElevation
                component={Link}
                to={`${route}/add`}
                className={`flex-shrink-0 pl-1 ${isWidthDownXs ? "" : "ml-2"}`}
                // className={`flex-shrink-0 pl-1 ${Mui.isWidthDown("xs", props.width) ? "" : "ml-2"}`}
              >
                {createLabel}
                <span className="ml-1 line-height-null">
                  <IconAdd />
                </span>
              </Mui.Button>
            ) : null}

            {enableColumnFilter ? <ColumnFilter headers={headCells} /> : null}
          </>
        ) : null}

        <Mui.Hidden mdUp>
          <Mui.IconButton
            color="primary"
            variant="outlined"
            className="btn-icon-square ml-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            <IconGear />
          </Mui.IconButton>
        </Mui.Hidden>

        <Mui.Hidden smUp>
          <Mui.Divider light={true} className="w-100 mt-1" />
        </Mui.Hidden>
      </Mui.Box>
    </Mui.Toolbar>
  );
};
const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {})(TableToolbar);

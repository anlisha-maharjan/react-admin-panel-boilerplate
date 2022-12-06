import React, { useState } from "react";
import * as Mui from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { BulkSelection, StyledButton } from "ui";

const Search = Mui.styled("div")(({ theme }) => ({
  width: "100%",
  position: "relative",
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = Mui.styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  pointerEvents: "none",
}));

const StyledInputBase = Mui.styled(Mui.TextField)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    width: "100%",
    height: "1.875rem",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Toolbar = (props) => {
  const {
    title,
    subTitle,
    classes,
    collapsibleFilter = true,
    buttonA,
    buttonAIcon,
    handleButtonA,
    allowButtonA,
    handleButtonB,
    buttonB,
    buttonBIcon,
    toggleAllRowsSelected,
    handleSearch,
    enableSearch = true,
    search,
    children,
    bulkSelectionOptions,
    handleOnClearAll,
    handleOnApplyFilter,
    enableApply,
    selectedFlatRows,
    searchref,
  } = props;

  const theme = Mui.useTheme();

  const rows = selectedFlatRows?.map((val) => val.original);

  const bulkSelected = Array.isArray(rows) && rows.length > 0;
  const [showFilter, setShowFilter] = useState(false);

  const childrenWithProps = React.Children.toArray(children)
    ?.filter((val) => val.type?.displayName !== "options")
    .map((child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {});
      }
      return child;
    });

  return (
    <Mui.Toolbar
      sx={{ minHeight: "initial", flexDirection: "column", p: "1.25rem 1.5rem" }}
      className={`${classes?.root || ""}`}
    >
      <Mui.Box
        width="calc(100% + (1.5rem * 2))"
        display="flex"
        flexWrap="wrap"
        position="relative"
        gap={2}
        m="-1.25rem -1.5rem 0"
        p="1.25rem 1.5rem"
        borderBottom={showFilter ? "thin solid #919eab3d" : "none"}
        borderRadius="1rem 1rem 0 0"
        backgroundColor={showFilter ? "#f4f6f8" : "transparent"}
        className={`${classes?.wrapper || ""}`}
      >
        <Mui.Typography
          component="h4"
          color="#646e77"
          fontSize="1.375rem"
          fontWeight="500"
          className={`${classes?.title || ""}`}
        >
          {title}

          {subTitle && (
            <Mui.Typography
              component="small"
              display="block"
              color=" #919eab"
              fontSize=".875rem"
              className={`${classes?.subTitle || ""}`}
            >
              {subTitle}
            </Mui.Typography>
          )}
        </Mui.Typography>

        {/* Hide Toolbar buttons on bulk selection */}
        {bulkSelected ? (
          <BulkSelection
            resetBulkSelection={toggleAllRowsSelected}
            selected={rows?.length}
            data={rows}
            selectedFlatRows={selectedFlatRows}
            bulkSelectionOptions={bulkSelectionOptions}
          />
        ) : (
          <Mui.Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent={{ sm: "flex-end" }}
            gap={2}
            ml="auto"
            className={`${classes?.innerFilterWrap || ""}`}
          >
            {enableSearch && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="#919eab" />
                </SearchIconWrapper>
                <StyledInputBase
                  searchref={searchref}
                  onChange={handleSearch}
                  value={search}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search", type: "search" }}
                />
              </Search>
            )}

            {collapsibleFilter // Show Filter button in toolbar if collapisbleFilter=true
              ? childrenWithProps &&
                childrenWithProps?.length > 0 && (
                  <Mui.IconButton
                    type="button"
                    onClick={() => setShowFilter(!showFilter)}
                    sx={{
                      borderRadius: 2,
                      color: "rgb(33, 43, 54)",
                      backgroundColor: showFilter ? "rgba(145, 158, 171, 0.16)" : "transparent",
                    }}
                  >
                    <FilterListIcon />
                  </Mui.IconButton>
                )
              : // Show All filters in toolbar if collapisbleFilter=false
                childrenWithProps}

            {buttonB && (
              <StyledButton
                type="button"
                variant="outlined"
                className={`${classes?.buttonB || ""}`}
                onClick={handleButtonB}
              >
                {buttonBIcon || ""}
                {buttonB}
              </StyledButton>
            )}

            {allowButtonA && buttonA && (
              <StyledButton type="button" className={`${classes?.buttonA || ""}`} onClick={handleButtonA}>
                {buttonAIcon || ""}
                {buttonA}
              </StyledButton>
            )}
          </Mui.Box>
        )}
      </Mui.Box>

      {/* Show Collapsible Filter If Enabled */}
      {collapsibleFilter && childrenWithProps && !bulkSelected && (
        <Mui.Box
          width="100%"
          display={showFilter ? "flex" : "none"}
          flexDirection="column"
          mt={2}
          className={`${classes?.filterWrap || ""}`}
        >
          <Mui.Box className={`w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 sm:gap-x-5 ${classes?.filters}`}>
            {childrenWithProps}
          </Mui.Box>

          <Mui.Box component="footer" display="flex" justifyContent="flex-end" gap="1rem" mt={2}>
            {enableApply && (
              <StyledButton
                type="button"
                color="#ffc107"
                className={`min-h-[1.75rem] text-sm font-normal`}
                onClick={handleOnApplyFilter}
              >
                Apply
              </StyledButton>
            )}

            <StyledButton
              type="button"
              color={theme.palette.grey.main}
              sx={{ color: theme.palette.text.primary }}
              variant="outlined"
              className={`min-h-[1.75rem] text-sm font-normal`}
              onClick={handleOnClearAll}
            >
              Clear All
            </StyledButton>
          </Mui.Box>
        </Mui.Box>
      )}
    </Mui.Toolbar>
  );
};

export default Toolbar;

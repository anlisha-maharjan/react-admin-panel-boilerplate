import React, { useMemo } from "react";
import * as Mui from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useCustomPagination, DOTS } from "./use-custom-pagination";

const Pagination = Mui.styled("ul")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  margin: "0",
  padding: "0",
  listStyle: "none",
}));

const PaginationItem = Mui.styled("li")(({ theme }) => ({
  display: "flex",
  flexShrink: 0,
  margin: "0",
  padding: "0",
  listStyle: "none",
}));

const PaginationButton = Mui.styled(Mui.IconButton)(({ theme }) => ({
  width: "2rem",
  height: "2rem",
  borderRadius: "8px",
  fontSize: "0.875rem",

  "&.active": {
    backgroundColor: "rgba(145, 158, 171, 0.16)",
    color: "#212b36",
  },

  "&.page-nav": {
    border: "1px solid #f4f6f8",
  },
}));

const TablePagination = (props) => {
  const {
    classes,
    showItemsPerPage = true,
    goToStart,
    goToPrev,
    goToNext,
    goToLast,
    handleChangePerPage,
    perPage,
    handleChangePage,
    meta,
  } = props;

  const theme = Mui.useTheme();

  const paginationRange = useCustomPagination({
    currentPage: meta?.page,
    totalPage: meta?.totalPages,
  });

  const onChangePerPage = (event) => {
    handleChangePerPage(event.target.value);
  };

  const displayOptions = useMemo(() => {
    const optionArr = [10, 20, 30, 40, 50, 100];
    return optionArr;
  }, []);

  return meta?.total > 0 ? (
    <Mui.Box
      component="footer"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      p="1rem 1.5rem"
      borderTop="1px solid rgba(145, 158, 171, 0.24)"
      fontSize=".875rem"
      className={`${classes?.root || ""}`}
    >
      {showItemsPerPage && (
        <Mui.Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
          <Mui.FormControl sx={{ minWidth: 12 }} size="small">
            <Mui.Select value={perPage} onChange={onChangePerPage}>
              {displayOptions.map((item) => {
                return (
                  <Mui.MenuItem key={item} value={item}>
                    {item}
                  </Mui.MenuItem>
                );
              })}
            </Mui.Select>
          </Mui.FormControl>
          <Mui.Typography variant="body2" color={theme.palette.grey.dark}>
            Items per page
          </Mui.Typography>
        </Mui.Box>
      )}

      <Mui.Box
        gap={2}
        className={`w-full flex flex-wrap items-center justify-start xl:justify-end
        ${showItemsPerPage ? "xl:w-2/4" : ""}`}
      >
        <Mui.Typography
          component="p"
          sx={{ color: "#212b36", fontSize: ".875rem" }}
          className={`${classes?.pageShowInfo}`}
        >
          {meta?.from || 0} - {meta?.to || 0} of {meta?.total}
        </Mui.Typography>

        <Pagination>
          <PaginationItem>
            <PaginationButton className="page-nav" type="button" onClick={goToStart} disabled={meta?.page === 1}>
              <KeyboardDoubleArrowLeftIcon />
            </PaginationButton>
          </PaginationItem>
          <PaginationItem>
            <PaginationButton className="page-nav" type="button" onClick={goToPrev} disabled={meta?.page === 1}>
              <ChevronLeftIcon />
            </PaginationButton>
          </PaginationItem>

          {paginationRange &&
            paginationRange.map((page, index) => {
              if (page === DOTS) {
                return (
                  <PaginationItem key={index} className="pagination-item dots">
                    &#8230;
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={index} onClick={(e) => handleChangePage(page)}>
                  <PaginationButton type="button" className={`${meta?.page === page ? "active" : ""}`}>
                    {page}
                  </PaginationButton>
                </PaginationItem>
              );
            })}

          <PaginationItem>
            <PaginationButton
              className="page-nav"
              type="button"
              onClick={goToNext}
              disabled={meta?.page === meta?.totalPages}
            >
              <ChevronRightIcon />
            </PaginationButton>
          </PaginationItem>
          <PaginationItem>
            <PaginationButton
              className="page-nav"
              type="button"
              onClick={goToLast}
              disabled={meta?.page === meta?.totalPages}
            >
              <KeyboardDoubleArrowRightIcon />
            </PaginationButton>
          </PaginationItem>
        </Pagination>
      </Mui.Box>
    </Mui.Box>
  ) : (
    <></>
  );
};
export default TablePagination;

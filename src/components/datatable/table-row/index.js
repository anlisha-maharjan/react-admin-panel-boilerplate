import React from "react";
import * as Mui from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Action from "./action";
import UserAvatarCell from "./user-avatar-cell";

const TableRow = (props) => {
  const navigate = useNavigate();
  const {
    isItemSelected,
    labelId,
    row,
    handleClick,
    headCells,
    index,
    handleOpenActionMenu,
    actionMenu,
    actionMenuId,
    handleCloseActionMenu,
    handleOpenAlert,
    handleOpenModal,
    handleCustomAction,
    handleDownload,
    permission,
    route,
    actionStyle,
    enableCheckbox,
    enableRowClick,
  } = props;

  return (
    <Mui.TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      {enableCheckbox ? (
        <Mui.TableCell
          padding="checkbox"
          className={`${enableRowClick ? "pointer" : ""}`}
          onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
        >
          <Mui.Checkbox
            onClick={(event) => handleClick(event, row.id)}
            checked={isItemSelected}
            color="primary"
            inputProps={{ "aria-labelledby": labelId }}
          />
        </Mui.TableCell>
      ) : null}

      {headCells &&
        headCells.map((column, i) => {
          switch (column.id) {
            case "userAvatar":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  <UserAvatarCell data={row} />
                </Mui.TableCell>
              );
            case "vehicleType":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["vehicleType"] ? row["vehicleType"]["name"] : ""}
                </Mui.TableCell>
              );
            case "role":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["role"]?.["name"] || ""}
                </Mui.TableCell>
              );
            case "vehicleCategory":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["vehicleCategory"]?.["name"] || ""}
                </Mui.TableCell>
              );
            case "status":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  <span
                    className={`text-transform-capitalize status-bg ${row[column.id] === "pending" ? "warn" : ""} ${
                      row[column.id] === "cancelled" ? "danger" : ""
                    } ${row[column.id] === "confirmed" ? "success" : ""} ${
                      row[column.id] === "completed" ? "disabled" : ""
                    }`}
                  >
                    {row[column.id]}
                  </span>
                </Mui.TableCell>
              );
            case "activeInactiveStatus":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  <span className={`text-transform-capitalize status-bg ${row["status"] ? "success" : "warn"}`}>
                    {row["status"] ? "Active" : "Inactive"}
                  </span>
                </Mui.TableCell>
              );
            case "couponMinPrice":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  ${row["minPrice"]}
                </Mui.TableCell>
              );
            case "couponPercent":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["percent"]}%
                </Mui.TableCell>
              );
            case "paymentStatus":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  <span
                    className={`text-transform-capitalize status-bg ${row[column.id] === "hold" ? "disabled" : ""} ${
                      row[column.id] === "deposit" ? "warn" : ""
                    } ${row[column.id] === "paid" ? "success" : ""}`}
                  >
                    {row[column.id]}
                  </span>
                </Mui.TableCell>
              );
            case "date":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {moment(row["pickupDate"]).format("MMM DD, YYYY")}
                </Mui.TableCell>
              );
            case "bookingType":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["type"] === "distance" ? "Point to Point" : null}
                  {row["type"] === "hourly" ? "Hourly" : null}
                  {row["type"] === "flat_rate" ? "Flat Rate" : null}
                </Mui.TableCell>
              );
            case "createdAt":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["createdAt"] ? moment(row["createdAt"]).format("MMM DD, YYYY HH:mm") : ""}
                </Mui.TableCell>
              );
            case "startDate":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["startDate"]
                    ? moment(row["startDate"] + " " + row["startTime"], "YYYY-MM-DD HH:mm:ss").format(
                        "MMM DD, YYYY HH:mm"
                      )
                    : ""}
                </Mui.TableCell>
              );
            case "endDate":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["endDate"]
                    ? moment(row["endDate"] + " " + row["endTime"], "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm")
                    : ""}
                </Mui.TableCell>
              );
            case "fullname":
              return (
                <Mui.TableCell
                  key={i}
                  className={`${enableRowClick ? "pointer" : ""}`}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row["firstName"]} {row["lastName"]}
                </Mui.TableCell>
              );
            default:
              return (
                <Mui.TableCell
                  className={`${enableRowClick ? "pointer" : ""}`}
                  key={i}
                  onClick={() => (enableRowClick ? navigate(`${route}/view/${row?.id}`) : "")}
                >
                  {row[column.id]}
                </Mui.TableCell>
              );
          }
        })}

      <Action
        index={index}
        handleOpenActionMenu={handleOpenActionMenu}
        actionMenu={actionMenu}
        actionMenuId={actionMenuId}
        handleCloseActionMenu={handleCloseActionMenu}
        row={row}
        handleOpenAlert={handleOpenAlert}
        handleOpenModal={handleOpenModal}
        handleDownload={handleDownload}
        handleCustomAction={handleCustomAction}
        permission={permission}
        route={route}
        actionStyle={actionStyle}
      />
    </Mui.TableRow>
  );
};
export default TableRow;

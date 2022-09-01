import React from "react";
import * as Mui from "@mui/material";
import { Link } from "react-router-dom";
import { IconEdit, IconTrash, IconEye, IconMoreKebab, IconDownload } from "src/components/svg";

const Action = (props) => {
  const {
    index,
    actionMenu,
    actionMenuId,
    row,
    handleOpenActionMenu,
    handleCloseActionMenu,
    handleOpenAlert,
    handleOpenModal,
    handleDownload,
    // handleCustomAction,
    permission,
    route,
    actionStyle, //option: kebab,icons, button
  } = props;

  return (
    <Mui.TableCell>
      {/* For Action Default Button List */}
      {actionStyle === "button" ? (
        <>
          {permission?.view ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              component={Link}
              to={route + "/view/" + row.id}
              className="font-weight-normal text-transform-none mr-1"
            >
              View
            </Mui.Button>
          ) : null}
          {route === "/booking" ? (
            <>
              {permission?.edit && (row.status === "pending" || row.status === "confirmed") ? (
                <Mui.Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={route + "/edit/" + row.id}
                  className="font-weight-normal text-transform-none mr-1"
                >
                  Edit
                </Mui.Button>
              ) : null}
            </>
          ) : (
            <>
              {permission?.edit ? (
                <Mui.Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={route + "/edit/" + row.id}
                  className="font-weight-normal text-transform-none mr-1"
                >
                  Edit
                </Mui.Button>
              ) : null}
            </>
          )}

          {permission?.delete ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleOpenAlert(row.id)}
              className="font-weight-normal text-transform-none mr-1"
            >
              Delete
            </Mui.Button>
          ) : null}
          {permission?.download && (row.paymentStatus === "deposit" || row.paymentStatus === "paid") ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleDownload(row.id, row.bookingNumber)}
              className="font-weight-normal text-transform-none mr-1"
            >
              Download Invoice
            </Mui.Button>
          ) : null}
        </>
      ) : null}

      {/* For Action Icon List */}
      {actionStyle === "icons" ? (
        <>
          {permission?.view ? (
            <Mui.Tooltip className="tooltip-default" arrow placement="bottom-start" title={"View"}>
              <Mui.IconButton className="btn-action-icon" component={Link} to={route + "/view/" + row.id}>
                <IconEye />
              </Mui.IconButton>
            </Mui.Tooltip>
          ) : null}
          {route === "/booking" ? (
            <>
              {permission?.edit && (row.status === "pending" || row.status === "confirmed") ? (
                <Mui.Tooltip className="tooltip-default" arrow placement="bottom-start" title={"Edit"}>
                  <Mui.IconButton className="btn-action-icon" component={Link} to={route + "/edit/" + row.id}>
                    <IconEdit />
                  </Mui.IconButton>
                </Mui.Tooltip>
              ) : null}
            </>
          ) : (
            <>
              {permission?.edit ? (
                <Mui.Tooltip className="tooltip-default" arrow placement="bottom-start" title={"Edit"}>
                  <Mui.IconButton className="btn-action-icon" component={Link} to={route + "/edit/" + row.id}>
                    <IconEdit />
                  </Mui.IconButton>
                </Mui.Tooltip>
              ) : null}
            </>
          )}
          {permission?.delete ? (
            <Mui.Tooltip className="tooltip-default" arrow placement="bottom-start" title={"Delete"}>
              <Mui.IconButton className="btn-action-icon" onClick={() => handleOpenAlert(row.id)}>
                <IconTrash />
              </Mui.IconButton>
            </Mui.Tooltip>
          ) : null}
          {permission?.download && (row.paymentStatus === "deposit" || row.paymentStatus === "paid") ? (
            <Mui.Tooltip className="tooltip-default" arrow placement="bottom-start" title={"Download"}>
              <Mui.IconButton className="btn-action-icon" onClick={() => handleDownload(row.id, row.bookingNumber)}>
                <IconDownload />
              </Mui.IconButton>
            </Mui.Tooltip>
          ) : null}
        </>
      ) : null}

      {/* For 3 dot Menu */}
      {actionStyle === "kebab" ? (
        <>
          <Mui.IconButton
            aria-describedby={`action-${index}`}
            onClick={(e) => {
              handleOpenActionMenu(e, `action-${index}`);
            }}
          >
            <IconMoreKebab />
          </Mui.IconButton>

          <Mui.Popover
            id={`action-${index}`}
            classes={{ root: "kebab-dropdown" }}
            anchorEl={actionMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={actionMenuId === `action-${index}`}
            onClose={() => handleCloseActionMenu()}
          >
            {permission?.view ? (
              <Mui.MenuItem component={Link} to={route + "/view/" + row.id}>
                <span>View</span>
              </Mui.MenuItem>
            ) : null}
            {route === "/booking" ? (
              <>
                {permission?.edit && (row.status === "pending" || row.status === "confirmed") ? (
                  <Mui.MenuItem component={Link} to={route + "/edit/" + row.id}>
                    <span>Edit</span>
                  </Mui.MenuItem>
                ) : null}
              </>
            ) : (
              <>
                {permission?.edit ? (
                  <Mui.MenuItem component={Link} to={route + "/edit/" + row.id}>
                    <span>Edit</span>
                  </Mui.MenuItem>
                ) : null}
              </>
            )}
            {permission?.delete ? (
              <Mui.MenuItem onClick={() => handleOpenAlert(row.id)}>
                <span>Delete</span>
              </Mui.MenuItem>
            ) : null}
            {permission?.download && (row.paymentStatus === "deposit" || row.paymentStatus === "paid") ? (
              <Mui.MenuItem onClick={() => handleDownload(row.id, row.bookingNumber)}>
                <span>Download Invoice</span>
              </Mui.MenuItem>
            ) : null}
          </Mui.Popover>
        </>
      ) : null}

      {/* For Modal View */}
      {actionStyle === "modal" ? (
        <>
          {permission?.view ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleOpenModal(row.id)}
              className="font-weight-normal text-transform-none mr-1"
            >
              View
            </Mui.Button>
          ) : null}
          {permission?.edit ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              className="font-weight-normal text-transform-none mr-1"
            >
              Edit
            </Mui.Button>
          ) : null}
          {permission?.delete ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleOpenAlert(row.id)}
              className="font-weight-normal text-transform-none mr-1"
            >
              Delete
            </Mui.Button>
          ) : null}
          {permission?.download && (row.paymentStatus === "deposit" || row.paymentStatus === "paid") ? (
            <Mui.Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleDownload(row.id, row.bookingNumber)}
              className="font-weight-normal text-transform-none mr-1"
            >
              Download Invoice
            </Mui.Button>
          ) : null}
        </>
      ) : null}
    </Mui.TableCell>
  );
};
export default Action;

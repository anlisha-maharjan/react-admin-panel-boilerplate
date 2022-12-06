import React from "react";
import * as Mui from "@mui/material";

const PopoverDropdown = (props) => {
  const { isFixedWidth, dropdownWidth, trigger, iconColor, triggerTooltip, children, ...others } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    dropdown: {
      minWidth: dropdownWidth || 200,
      width: isFixedWidth ? dropdownWidth || 200 : "inherit",
      marginTop: 1.5,
      boxShadow: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px",
      borderRadius: "0.75rem",
      overflow: "visible",
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        borderTop: "1px solid rgba(145, 158, 171, 0.12)",
        borderLeft: "1px solid rgba(145, 158, 171, 0.12)",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
    items: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      "& .MuiMenuItem-root": {
        margin: "0 0.5rem",
        padding: "0.375rem 1rem",
        borderRadius: 1.5,
        fontSize: "0.875rem",
        lineHeight: "1.57143",

        "& svg": {
          width: "1.25rem",
          height: "1.25rem",
          marginRight: "1rem",
          flexShrink: 0,
        },
      },
    },
  };

  return (
    <>
      <Mui.Tooltip title={triggerTooltip}>
        <Mui.Button
          onClick={handleClick}
          size="small"
          sx={{ minWidth: "initial", "& svg": { fill: iconColor, color: iconColor } }}
        >
          {trigger}
        </Mui.Button>
      </Mui.Tooltip>

      <Mui.Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: { ...styles.dropdown },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        {...others}
      >
        <Mui.Box sx={styles.items}>{children}</Mui.Box>
      </Mui.Popover>
    </>
  );
};

export default PopoverDropdown;

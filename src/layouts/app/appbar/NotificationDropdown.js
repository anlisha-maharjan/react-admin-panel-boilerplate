import React from "react";
import * as Mui from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageIcon from "@mui/icons-material/Message";
import MailIcon from "@mui/icons-material/Mail";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PopoverDropdown from "ui/PopoverDropdown";

const NotificationItem = Mui.styled(Mui.ListItemButton)(({ theme }) => ({
  alignItems: "center",
  gap: "1rem",
  marginBottom: ".15rem",
  padding: "12px 20px",
}));

const NotificationItemText = Mui.styled(Mui.ListItemText)(({ theme }) => ({
  margin: "0",
  "& .MuiListItemText-primary": {
    color: theme.palette.grey.dark,
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: 1.57143,
  },
}));
const NotificationItemIcon = Mui.styled(Mui.ListItemAvatar)(({ theme }) => ({
  minWidth: "initial",
  width: "2.5rem",
  height: "2.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 0,
  padding: "0.5rem",
  borderRadius: "50%",
  background: "#f8f8f8",
  "& svg": { fill: theme.palette.primary.main, color: theme.palette.primary.main },
}));

const NotificationDropdown = () => {
  const theme = Mui.useTheme();

  return (
    <>
      <PopoverDropdown
        isFixedWidth={true}
        dropdownWidth="21.875rem"
        trigger={<NotificationsIcon />}
        iconColor={theme.palette.grey.dark}
      >
        <Mui.Typography
          component="span"
          variant="subtitle2"
          sx={{
            display: "block",
            mt: "-0.5rem",
            p: "0.75rem 1.25rem",
            color: "#000000",
          }}
        >
          Notifications
          <Mui.Typography component="small" variant="body2" display="block" color={theme.palette.grey.dark}>
            You have 2 unread messages
          </Mui.Typography>
        </Mui.Typography>

        <Mui.Divider sx={{ mb: "0.5rem", borderBottom: "thin dashed rgba(145, 158, 171, 0.24)" }} />

        <Mui.List
          sx={{ p: 0 }}
          subheader={
            <Mui.ListSubheader
              component="div"
              sx={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: theme.palette.grey.dark,
                lineHeight: 1,
              }}
            >
              NEW
            </Mui.ListSubheader>
          }
        >
          <NotificationItem sx={{ bgcolor: "rgba(145, 158, 171, 0.16)" }}>
            <NotificationItemIcon>
              <MessageIcon fontSize="small" />
            </NotificationItemIcon>
            <NotificationItemText
              primary={
                <>
                  <Mui.Typography component="span" sx={{ color: "#000000", fontSize: "0.875rem", fontWeight: "600" }}>
                    You have new message
                  </Mui.Typography>{" "}
                  5 unread messages
                </>
              }
              secondary={
                <Mui.Typography
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#919eab",
                    fontSize: "0.75rem",
                  }}
                >
                  <AccessTimeIcon fontSize="22px" />
                  2days ago
                </Mui.Typography>
              }
            />
          </NotificationItem>
          <NotificationItem sx={{ bgcolor: "rgba(145, 158, 171, 0.16)" }}>
            <NotificationItemIcon sx={{ mt: 0 }}>
              <GroupAddIcon fontSize="small" />
            </NotificationItemIcon>
            <NotificationItemText
              primary={
                <>
                  <Mui.Typography component="span" sx={{ color: "#000000", fontSize: "0.875rem", fontWeight: "600" }}>
                    New User Created
                  </Mui.Typography>{" "}
                  2 new user created
                </>
              }
              secondary={
                <Mui.Typography
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#919eab",
                    fontSize: "0.75rem",
                  }}
                >
                  <AccessTimeIcon fontSize="22px" />
                  2days ago
                </Mui.Typography>
              }
            />
          </NotificationItem>
        </Mui.List>

        <Mui.List
          sx={{ p: 0 }}
          subheader={
            <Mui.ListSubheader
              component="div"
              sx={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: theme.palette.grey.dark,
                lineHeight: 1,
              }}
            >
              BEFORE THAT
            </Mui.ListSubheader>
          }
        >
          <NotificationItem>
            <NotificationItemIcon sx={{ mt: 0 }}>
              <MailIcon fontSize="small" />
            </NotificationItemIcon>
            <NotificationItemText
              primary={
                <>
                  <Mui.Typography component="span" sx={{ color: "#000000", fontSize: "0.875rem", fontWeight: "600" }}>
                    You have new mail
                  </Mui.Typography>{" "}
                  sent from gmail
                </>
              }
              secondary={
                <Mui.Typography
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#919eab",
                    fontSize: "0.75rem",
                  }}
                >
                  <AccessTimeIcon fontSize="22px" />
                  2days ago
                </Mui.Typography>
              }
            />
          </NotificationItem>
          <NotificationItem>
            <NotificationItemIcon sx={{ mt: 0 }}>
              <GroupAddIcon fontSize="small" />
            </NotificationItemIcon>
            <NotificationItemText
              primary={
                <>
                  <Mui.Typography component="span" sx={{ color: "#000000", fontSize: "0.875rem", fontWeight: "600" }}>
                    New User Created
                  </Mui.Typography>{" "}
                  2 new user created
                </>
              }
              secondary={
                <Mui.Typography
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#919eab",
                    fontSize: "0.75rem",
                  }}
                >
                  <AccessTimeIcon fontSize="22px" />
                  2days ago
                </Mui.Typography>
              }
            />
          </NotificationItem>
        </Mui.List>

        <Mui.Divider sx={{ mt: "0.5rem", borderBottom: "thin dashed rgba(145, 158, 171, 0.24)" }} />

        <Mui.MenuItem sx={{ justifyContent: "center", mt: "1rem", color: theme.palette.primary.main }}>
          View All
        </Mui.MenuItem>
      </PopoverDropdown>
    </>
  );
};

export default NotificationDropdown;

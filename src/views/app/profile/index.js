import React from "react";
import * as Mui from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {BreadcrumbContainer} from "ui";
import TabStyles from "styles/Tab.style";
import GeneralTab from "./GeneralTab";
import ChangePasswordTab from "./ChangePasswordTab";

const Profile = () => {
  const theme = Mui.useTheme();
  const TabStyle = TabStyles(theme);

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <BreadcrumbContainer
        title="Profile"
        paths={[
          {
            title: "Profile Settings",
          },
        ]}
      />

      <Mui.Tabs sx={TabStyle} value={activeTab} onChange={handleTabChange}>
        <Mui.Tab icon={<AccountBoxIcon />} iconPosition="start" label="General" disableRipple />
        <Mui.Tab icon={<VpnKeyIcon />} iconPosition="start" label="Change Password" disableRipple />
      </Mui.Tabs>

      {activeTab === 0 && <GeneralTab />}

      {activeTab === 1 && <ChangePasswordTab />}
    </>
  );
};

export default Profile;

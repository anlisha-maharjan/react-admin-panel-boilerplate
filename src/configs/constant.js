import PrimaryLogo from "src/assets/images/logo.svg";
import SecondaryLogo from "src/assets/images/logo-small.svg";

export const toolBarConfig = {
  primaryLogo: PrimaryLogo,
  secondaryLogo: SecondaryLogo,
  style: "sticky", //option: static, sticky, fixed
  bgColor: "#ffffff",
  textColor: "#555454",
  iconColor: "#4B4A4A",
};

export const sideNavConfig = {
  primaryLogo: PrimaryLogo,
  secondaryLogo: SecondaryLogo,
  hoverSubMenu: false,
  collapseState: { md: true, lg: false }, //sidemenu default state in medium devices and large devices
  expandOnHover: true, //Expand side nav on hover if side nav is collapsed & hoversubmenu is false
  bgColor: "#1A2225",
  textColor: "#ffffff",
  iconColor: "#ffffff",
  activeColor: "#d5ab53",
  hoverSubmenubg: "#F19E39",
};

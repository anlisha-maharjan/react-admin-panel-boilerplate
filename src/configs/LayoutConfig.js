import PrimaryLogo from "assets/images/logo.png";

export const appBarConfig = {
  primaryLogo: PrimaryLogo,
  height: 75,
  style: "sticky", //option: static, sticky, fixed
};

export const sideNavConfig = {
  drawerWidth: { small: 88, large: 280 },
  primaryLogo: PrimaryLogo,
  collapseStateBelow: "xxl", // Sidemenu default state in medium devices and large devices
  navigateOnParentClick: false, // Enable this if you want to navigate to first child on parent click
};

export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

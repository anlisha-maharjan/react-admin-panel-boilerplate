import React, { Component } from "react";
import * as Mui from "@mui/material";
import { IconCheckO, IconCloseO, IconInfo, IconWarn } from "src/components/svg";

class Toast extends Component {
  render() {
    const setToastType = (type) => {
      if (type === "success") {
        return { title: "Success", icon: <IconCheckO /> };
      } else if (type === "error") {
        return { title: "Error", icon: <IconCloseO /> };
      } else if (type === "warning") {
        return { title: "Warning", icon: <IconWarn /> };
      } else {
        return { title: "Info", icon: <IconInfo /> };
      }
    };

    return (
      <>
        <span className="icon">{setToastType(this.props.type).icon}</span>
        <Mui.Typography component="h5" variant="h5">
          {setToastType(this.props.type).title}
          <Mui.Typography component="span" variant="body1" className="d-block">
            {this.props.message}
          </Mui.Typography>
        </Mui.Typography>
      </>
    );
  }
}
export default Toast;

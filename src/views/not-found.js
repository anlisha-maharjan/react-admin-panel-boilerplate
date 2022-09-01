import React, { Component } from "react";
import * as Mui from "@mui/material";

class NotFound extends Component {
  render() {
    return (
      <section className="inner-banner">
        <Mui.Container maxWidth="md" className="inner-banner__content">
          <Mui.Typography component="h2" variant="h2" className="text-center mb-1" style={{ fontSize: "4vh" }}>
            SORRY
          </Mui.Typography>
          <Mui.Typography component="p" variant="subtitle1" className="text-center mb-1">
            The requested page was not found.
          </Mui.Typography>
          <Mui.Typography component="p" variant="subtitle2" className="text-center">
            It seems you have ventured onto a broken link, please use the menu bar to navigate to the desired page.
          </Mui.Typography>
        </Mui.Container>
      </section>
    );
  }
}
export default NotFound;

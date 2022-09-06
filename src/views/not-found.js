import React from "react";
import * as Mui from "@mui/material";

const NotFound = (props) => {
  return (
    <section className="inner-banner">
      <Mui.Container maxWidth="md" className="inner-banner__content">
        <Mui.Typography component="h2" variant="h2" className="text-center mb-1" style={{ fontSize: "4vh" }}>
          SORRY
        </Mui.Typography>
        <Mui.Typography component="p" variant="subtitle1" className="text-center mb-1">
          The requested page was not found. It seems you have ventured onto a broken link.
        </Mui.Typography>
        <Mui.Button href="/" color="primary" className="btn-default" variant="contained">
          Go Back
        </Mui.Button>
      </Mui.Container>
    </section>
  );
};
export default NotFound;

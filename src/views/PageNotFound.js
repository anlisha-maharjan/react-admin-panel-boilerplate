import React from "react";
import * as Mui from "@mui/material";

const PageNotFound = (props) => {
  return (
    <section>
      <Mui.Container maxWidth="md">
        <Mui.Typography component="h2" variant="h2" className="text-center mb-3" style={{ fontSize: "4vh" }}>
          SORRY!!
        </Mui.Typography>
        <Mui.Typography component="p" variant="subtitle1" className="text-center mb-3">
          The requested page was not found. It seems you have ventured onto a broken link.
        </Mui.Typography>
        <Mui.Box display="flex" justifyContent="center">
          <Mui.Button href="/" color="primary" className="btn-default" variant="contained">
            Go Back
          </Mui.Button>
        </Mui.Box>
      </Mui.Container>
    </section>
  );
};
export default PageNotFound;

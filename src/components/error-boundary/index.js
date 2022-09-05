import React, { Component } from "react";
import * as Mui from "@mui/material";
import { IconWarn } from "src/components/svg";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, isChunkIssue: false };
  }

  componentDidCatch(error) {
    if (error.name === "ChunkLoadError") {
      this.setState({ error: true, isChunkIssue: true });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.error || this.state.isChunkIssue) {
      return (
        <Mui.Box
          maxWidth="100%"
          maxHeight="100%"
          width="768px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          m="auto"
          textAlign="center"
        >
          <Mui.Box width="15rem" height="15rem" mb="2rem" className="svg-fill svg-danger">
            <IconWarn />
          </Mui.Box>
          <Mui.Typography className="mt-2 mb-2 font-semi-bold" component="h4" variant="h4">
            Some problem has occurred.
          </Mui.Typography>
          <Mui.Typography className="mt-1" component="p" variant="h5">
            We're sorry for the inconvenience. The details have been notified to the administrator, so we will
            investigate and respond immediately.
          </Mui.Typography>
          <Mui.Button
            onClick={() => window.location.reload()}
            color="primary"
            variant="contained"
            disableElevation
            className="mt-2 text-xs normal-case"
          >
            Reload Page
          </Mui.Button>
        </Mui.Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

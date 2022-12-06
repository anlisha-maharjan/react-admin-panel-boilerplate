import React, { Component } from "react";
import * as Mui from "@mui/material";
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
        <Mui.Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Mui.Typography component="h2" variant="h2" className="text-center mb-3 mt-32" style={{ fontSize: "4vh" }}>
            Some problem has occurred!!
          </Mui.Typography>
          <Mui.Typography component="p" variant="subtitle1" className="text-center mb-3">
            We&apos;re sorry for the inconvenience. The details have been notified to the administrator, so we will
            investigate and respond immediately.
          </Mui.Typography>
          <Mui.Button
            onClick={() => window.location.reload()}
            color="primary"
            className="btn-default"
            variant="contained"
            disableElevation
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

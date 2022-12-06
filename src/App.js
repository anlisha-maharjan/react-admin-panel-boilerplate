/**
 * Entry application component used to compose providers and render Routes.
 * */
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "reduxs/store";
import theme from "configs/Theme";
import ErrorBoundary from "views/ErrorBoundry";
import { LayoutSplashScreen } from "configs/LayoutSplashScreen";
import Root from "./Root";

const App = () => {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      <ErrorBoundary>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <Suspense fallback={<LayoutSplashScreen />}>
          {/* Render routes with provided `Layout`. */}

          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Root />
            </ThemeProvider>
          </StyledEngineProvider>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;

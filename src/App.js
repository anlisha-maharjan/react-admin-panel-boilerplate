/**
 * Entry application component used to compose providers and render Routes.
 * */
import React, { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "src/reduxs/store";
import { LayoutSplashScreen } from "src/configs/splash-screen";
import theme from "src/configs/theme";
import ErrorBoundary from "src/components/error-boundary";
import Root from "./Root";

export default function App() {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      <ErrorBoundary>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <Suspense fallback={<LayoutSplashScreen />}>
          <ThemeProvider theme={theme}>
            {/* Render routes with provided `Layout`. */}
            <Root />
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { SplashScreenProvider } from "configs/LayoutSplashScreen";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // Enabling StrictMode causes twice re-rendering
  <SplashScreenProvider>
    <App />
  </SplashScreenProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

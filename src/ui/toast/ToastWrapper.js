import React from "react";
import * as Mui from "@mui/material";
import { ToastContainer } from "react-toastify";

const Toaster = Mui.styled(ToastContainer)(
  ({ theme }) => `
 .Toastify__toast {
    display: flex;
    align-items: center;
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    .Toastify__toast-body {
        margin: 0;
        padding: 0;
    }
    .Toastify__toast-icon { display: none; }

    .Toastify__close-button {
        width: 23px;
        height: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 21px;
        right: 10px;
        border-radius: 4px;        
        color: #555;
        opacity: 1;

        svg { width: 12px; height: 12px; }

        &:hover {
            background-color: #fff;
            box-shadow: 0 0 1px 1px rgb(231, 231, 231, 0.25);
        }
    }
 }
`
);

const ToastWrapper = (props) => {
  return <Toaster {...props} />;
};

export default ToastWrapper;

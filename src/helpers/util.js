import React from "react";
import { toast } from "react-toastify";
import { Toast } from "ui";

export const paginationLimit = 10;
export const uploadMaxFileSize = 5;
export const dateFormat = "DD.MM.YYYY";
export const timeFormat = "HH:mm:ss";

export const numberWithCommas = (x) => {
  return x.toLocaleString();
};

export const monetarySuffix = (val) => {
  if (val >= 1000) {
    return parseFloat(val / 1000).toFixed(2) + "K";
  } else if (val % 1 !== 0) {
    return parseFloat(val).toFixed(2);
  } else {
    return val;
  }
};

export const bytesToHuman = (bytes) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  for (i = 0; bytes >= 1024; i++) {
    bytes /= 1024;
  }
  return Math.round(bytes, 2) + " " + units[`${i}`];
};

export const handleResponseErrorMessage = (error) => {
  if (error.response) {
    //API Error Response
    return error.response?.data?.error || error.response?.data?.message;
  } else if (error.request) {
    return "something went wrong";
  } else if (error.message) {
    //App Error
    return error.message;
  } else {
    //Custom Error
    return error;
  }
};

export const parseMessage = (message) => {
  let text = "";
  if (typeof message == "object") {
    for (const key in message) {
      if (Array.isArray(message[key])) {
        // eslint-disable-next-line no-loop-func
        message[key].forEach((elem) => {
          text += elem;
        });
      } else if (typeof message[key] == "string") {
        text += message[key];
      } else {
        text += JSON.stringify(message[key]);
      }
    }
  } else if (typeof message == "string") {
    text = message;
  } else {
    text += JSON.stringify(message);
  }
  return text;
};

export const checkPermission = (permissionList, key) => {
  return permissionList?.some((el) => el.name === key);
};

export const extractValue = (arr, prop) => {
  // extract value from property
  const extractedValue = arr.map((item) => item[prop]);
  return extractedValue;
};

export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints;
};

export const toaster = (action, message, autoClose) => {
  switch (action) {
    case "primary":
      return toast.success(<Toast type="primary" message={message} />, {
        containerId: "default",
        autoClose: autoClose,
      });
    case "error":
      return toast.error(<Toast type="error" message={message} />, {
        containerId: "default",
        autoClose: autoClose,
      });
    case "warn":
      return toast.warn(<Toast type="warn" message={message} />, {
        containerId: "default",
        autoClose: autoClose,
      });

    default:
      return toast.info(<Toast type="info" message={message} />, {
        containerId: "default",
        autoClose: autoClose,
      });
  }
};

export const cleanQueryObj = (props) => {
  for (const obj in props) {
    if (props[obj] === "" || props[obj] === null || props[obj] === undefined) {
      delete props[obj];
    }
  }
  return props;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

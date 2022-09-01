export const numberWithCommas = (x) => {
  return x.toLocaleString();
};

export const parseMessage = (message) => {
  var text = "";
  if (typeof message == "object") {
    for (let key in message) {
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

export const extractValue = (arr, prop) => {
  // extract value from property
  let extractedValue = arr.map((item) => item[prop]);
  return extractedValue;
};

import axios from "axios";
// Create axios request
const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default request;

// Add a request interceptor
request.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

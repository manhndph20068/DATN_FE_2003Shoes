import axios from "axios";
import { callLogout } from "../services/api";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const access_token = localStorage.getItem("access_token");
if (access_token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
}

const handleRefreshToken = async () => {
  console.log("handleRefreshToken");
  const res = await instance.post("/api/v1/auth/refreshToken", null, {
    headers: {
      [NO_RETRY_HEADER]: true, // set the NO_RETRY_HEADER
    },
  });
  console.log("res", res);
  if (res && res.accessToken) {
    return res.accessToken;
  } else {
    return null;
  }
};
const NO_RETRY_HEADER = "x-no-retry";
let isRefreshing = false;
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    console.log("errr req :", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response Intercepter :", response);
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Do something with request error
    console.log("res Intercepter Er:", error);
    if (
      +error.response.status === 401 &&
      error.config.url === "/api/v1/auth/refreshToken" &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      // localStorage.removeItem("access_token");
      error.config.headers[NO_RETRY_HEADER] = true;
      window.location.reload();
      // error.config.headers[NO_RETRY_HEADER] = true;
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      localStorage.removeItem("access_token");
      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = true;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        error.config.headers["Authorization"] = `Bearer ${access_token}`;

        return instance.request(error.config);
      }
    }
    // if (error.config && error.response && +error.response.status === 403) {
    //   window.location.reload();
    // }
    // return Promise.reject(error);
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;

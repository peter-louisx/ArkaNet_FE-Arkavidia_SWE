import Axios from "axios";
import api from "./api";

const axios = Axios.create({
  baseURL: api.BASE_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// "api" axios instance
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response?.status === 401 &&
      window?.location?.pathname !== "/login"
    ) {
      localStorage.clear();
      return window.location.replace("/");
    }

    throw error;
  }
);

export default axios;

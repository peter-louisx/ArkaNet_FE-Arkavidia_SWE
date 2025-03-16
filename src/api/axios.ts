import Axios from "axios";
import api from "./api";
import { deleteSession } from "@/lib/session";

const axios = Axios.create({
  baseURL: api.BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response?.status === 401 &&
      window?.location?.pathname !== "/login"
    ) {

      await deleteSession();
      localStorage.clear();
      return window.location.replace("/login");
    }

    throw error;
  }
);

export default axios;

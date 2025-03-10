import Axios from "axios";
import api from "./api";

const axios = Axios.create({
  baseURL: api.BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;

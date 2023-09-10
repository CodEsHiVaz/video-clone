import axios from "axios";
import { API_BASE_URL } from "../env/env";

const apiBaseUrl = API_BASE_URL;
export const AuthApi = axios.create({
  baseURL: apiBaseUrl,
});
// const token = getToken("token");
export const videoApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

import axios from "axios";
const BASE_URL = "http://192.168.29.27:5000";
// const BASE_URL = "http://localhost:5000";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

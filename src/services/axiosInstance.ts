import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.35:3001",
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;

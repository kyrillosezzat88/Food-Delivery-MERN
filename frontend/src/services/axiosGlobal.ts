import axios from "axios";

axios.defaults.baseURL = "https://tomato-backend2.vercel.app/api/v1";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

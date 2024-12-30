import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_ENVIRONMENT == "DEVELOPMENT"
      ? "https://localhost:7240/api/v1"
      : "/api/v1",
  withCredentials: true,
});

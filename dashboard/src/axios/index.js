import axios from "axios";

const token = localStorage.getItem("authToken");
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json"; // İstenirse bu satırı ekleyebilirsiniz
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const HTTP = axios.create({
  baseURL: "https://localhost:44307/api",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
});

export const Login = async (tcNo) => await HTTP.get("/Account/Login/" + tcNo);

export const getUsersList = async () => await HTTP.get("/User");

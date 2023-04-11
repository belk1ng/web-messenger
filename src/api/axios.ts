import axios from "axios";

const instance = axios.create({
  baseURL: "https://ya-praktikum.tech/api/v2",
  timeout: 5000,
  withCredentials: true,
});

export default instance;

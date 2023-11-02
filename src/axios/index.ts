import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:3000",
});

export default instance;

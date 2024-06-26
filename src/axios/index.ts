import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://b2014805-laithevan-backend-autovision.vercel.app",
});

export default instance;

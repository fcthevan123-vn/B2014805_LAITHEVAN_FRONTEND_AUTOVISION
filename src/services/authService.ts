import axios from "../axios";
const AuthService = {
  async login(email: string, password: string) {
    const res = await axios.get(
      `/api/v1/auth/login?email=${email}&password=${password}`
    );
    return res.data;
  },
  async loginAdmin(email: string, password: string) {
    const res = await axios.get(
      `/api/v1/staff/login?email=${email}&password=${password}`
    );
    return res.data;
  },
  async getProfile() {
    const res = await axios.get(`/api/v1/auth/get-profile`);
    return res.data;
  },
  async getProfileAdmin() {
    const res = await axios.get(`/api/v1/staff/get-profile`);
    return res.data;
  },
  async logout() {
    const res = await axios.get("/api/v1/auth/logout");
    return res.data;
  },
};

export default AuthService;

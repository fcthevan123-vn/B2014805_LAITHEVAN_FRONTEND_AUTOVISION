import axios from "../axios";
const UserService = {
  async Register(data: object) {
    const res = await axios.post("/api/v1/user/create", data);
    return res.data;
  },
  async UpdateProfile(data: object) {
    const res = await axios.patch("/api/v1/user/update", data);
    return res.data;
  },
  async ChangePassword(data: object) {
    const res = await axios.patch("/api/v1/user/change-password", data);
    return res.data;
  },

  async GetAllUserByAdmin(data: { id: string }) {
    const res = await axios.post("/api/v1/staff/all-users", data);
    return res.data;
  },

  async DeleteUserByAdmin(data: {
    id: string;
    userId: string;
    status: boolean;
  }) {
    const res = await axios.post("/api/v1/staff/delete-user", data);
    return res.data;
  },
};

export default UserService;

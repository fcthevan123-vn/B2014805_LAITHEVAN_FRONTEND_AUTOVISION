import axios from "../axios";
const UserService = {
  async Register(data: object) {
    const res = await axios.post("/api/v1/user/create", data);
    return res.data;
  },
};

export default UserService;

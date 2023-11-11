import axios from "../axios";
const OrderService = {
  async CreateOrder(data: object) {
    const res = await axios.post("/api/v1/order/create", data);
    return res.data;
  },
};

export default OrderService;

import axios from "../axios";
const OrderService = {
  async CreateOrder(data: object) {
    const res = await axios.post("/api/v1/order/create", data);
    return res.data;
  },
  async GetOrderByUserId(data: object) {
    const res = await axios.post("/api/v1/order/all-orders", data);
    return res.data;
  },
  async GetAllOrderByStatus(TrangThai: string) {
    const res = await axios.get(
      `/api/v1/order/all-orders?TrangThai=${TrangThai}`
    );
    return res.data;
  },
  async DeleteOrder(id: string) {
    const res = await axios.delete(`/api/v1/order/delete-order/${id}`);
    return res.data;
  },
  async UpdateOrder(data: object) {
    const res = await axios.patch(`/api/v1/order/update-order`, data);
    return res.data;
  },
  async ConfirmOrder(data: object) {
    const res = await axios.patch(`/api/v1/order/confirm-order`, data);
    return res.data;
  },

  async ConfirmReceive(id: string) {
    const res = await axios.patch(`/api/v1/order/confirm-receive/${id}`);
    return res.data;
  },
  async UserStatistic(id: string) {
    const res = await axios.get(`/api/v1/order/statistic/${id}`);
    return res.data;
  },
  async AdminStatistic() {
    const res = await axios.get(`/api/v1/order/admin-statistic`);
    return res.data;
  },
};

export default OrderService;

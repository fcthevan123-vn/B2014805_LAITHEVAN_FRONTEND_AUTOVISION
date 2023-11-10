import axios from "../axios";
const CartService = {
  async AddToCart(data: object) {
    const res = await axios.post("/api/v1/cart/add-to-cart", data);
    return res.data;
  },
  async RemoveFromcart(id: string) {
    const res = await axios.delete(`/api/v1/cart/remove-from-cart/${id}`);
    return res.data;
  },
  async GetCart(id: string) {
    const res = await axios.get(`/api/v1/cart/${id}`);
    return res.data;
  },
  async UpdateCart(data: object) {
    const res = await axios.patch(`/api/v1/cart/update`, data);
    return res.data;
  },
};

export default CartService;

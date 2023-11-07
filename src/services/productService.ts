import axios from "../axios";
import { HangHoaTS } from "../utils/allTypeTs";
const ProductService = {
  async createProduct(data: HangHoaTS) {
    let formData = new FormData();
    formData.append("TenHH", data.TenHH);
    formData.append("MoTaHH", data.MoTaHH);
    formData.append("Gia", data.Gia.toString());
    formData.append("SoLuongHang", data.SoLuongHang.toString());
    formData.append("TrongLuong", data.TrongLuong.toString());
    formData.append("ChatLieu", data.ChatLieu);
    formData.append("PhuHopVoi", data.PhuHopVoi);
    formData.append("CongNgheDem", data.CongNgheDem);
    formData.append("DeNgoai", data.DeNgoai);
    formData.append("GhiChu", data.GhiChu);
    if (!data.NoiBat) {
      formData.append("NoiBat", "false");
    } else {
      formData.append("NoiBat", data.NoiBat.toString());
    }

    if (data.HinhUpload && data.HinhUpload.length > 0) {
      for (let i = 0; i < data.HinhUpload.length; i++) {
        formData.append("HinhUpload", data.HinhUpload[i]);
      }
    }

    const res = await axios.post("/api/v1/product/create", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
    return res.data;
  },

  async getAllProducts() {
    const res = await axios.get("/api/v1/product/all-products");
    return res.data;
  },
};

export default ProductService;

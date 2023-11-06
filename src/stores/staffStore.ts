// userStore.ts
import { defineStore } from "pinia";
import { StaffTS } from "../utils/allTypeTs";
import router from "../router";

export const useStaffStore = defineStore({
  id: "staff",
  state: () => ({
    staff: {
      _id: "",
      HoTenNV: "",
      ChucVu: "",
      email: "",
      SoDienThoai: "",
      DiaChi: "",
      createdAt: "",
      updatedAt: "",
    },
    isLogin: false,
  }),
  actions: {
    setStaff(newStaff: StaffTS) {
      this.staff = newStaff;
      localStorage.setItem("staff", JSON.stringify(this.staff));
    },
    getStaff() {
      const dataUser = localStorage.getItem("staff");
      if (dataUser) {
        return JSON.parse(localStorage.getItem("staff") || "");
      }
      return [];
    },
    getStateLogin() {
      const login = localStorage.getItem("isLoginAdmin");
      if (login) {
        return JSON.parse(localStorage.getItem("isLoginAdmin") || "");
      }
      return false;
    },
    logout() {
      this.staff = {
        _id: "",
        HoTenNV: "",
        ChucVu: "",
        email: "",
        SoDienThoai: "",
        DiaChi: "",
        createdAt: "",
        updatedAt: "",
      };
      localStorage.removeItem("isLoginAdmin");
      localStorage.removeItem("staff");
      router.push("/admin/login");
    },
    setIsLogin(state: boolean) {
      this.isLogin = state;
      localStorage.setItem("isLoginAdmin", JSON.stringify(state));
    },
  },
});

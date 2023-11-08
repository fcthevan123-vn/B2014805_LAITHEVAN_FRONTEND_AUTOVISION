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
    },
    getStaff() {
      return this.staff;
    },
    getStateLogin() {
      return this.isLogin;
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
      router.push("/admin/login");
    },
    setIsLogin(state: boolean) {
      this.isLogin = state;
    },
  },
});

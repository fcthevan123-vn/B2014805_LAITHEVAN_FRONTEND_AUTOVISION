// userStore.ts
import { defineStore } from "pinia";
import { UserTS } from "../utils/allTypeTs";
import router from "../router";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      _id: "",
      HoTenKH: "",
      email: "",
      SoDienThoai: "",
      DiaChi: "",
      createdAt: "",
      updatedAt: "",
    },
    isLogin: false,
  }),
  actions: {
    setUser(newUser: UserTS) {
      this.user = newUser;
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    getUser() {
      const dataUser = localStorage.getItem("user");
      if (dataUser) {
        return JSON.parse(localStorage.getItem("user") || "");
      }
      return [];
    },
    getStateLogin() {
      const login = localStorage.getItem("isLogin");
      if (login) {
        return JSON.parse(localStorage.getItem("isLogin") || "");
      }
      return false;
    },
    logout() {
      this.user = {
        _id: "",
        HoTenKH: "",
        email: "",
        SoDienThoai: "",
        DiaChi: "",
        createdAt: "",
        updatedAt: "",
      };
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      router.push("/login");
    },
    setIsLogin(state: boolean) {
      this.isLogin = state;
      localStorage.setItem("isLogin", JSON.stringify(state));
    },
  },
});

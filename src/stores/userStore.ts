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
    },
    getUser() {
      return this.user;
    },
    getStateLogin() {
      return this.isLogin;
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
      router.push("/login");
    },
    setIsLogin(state: boolean) {
      this.isLogin = state;
    },
  },
});

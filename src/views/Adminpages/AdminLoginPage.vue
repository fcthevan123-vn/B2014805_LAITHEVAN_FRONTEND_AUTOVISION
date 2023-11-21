<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { AuthService } from "../../services";
import router from "../../router";
import { useStaffStore } from "../../stores/staffStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { ConvertErrorMessage } from "../../utils/importAllComponent";

const toast = useToast();
const { errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Email không hợp lệ").required("Email trống"),
    password: yup
      .string()
      .required("Mật khẩu trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  }),
});

const staffStore = useStaffStore();

const email = defineInputBinds("email");

const password = defineInputBinds("password");

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await AuthService.loginAdmin(values.email, values.password);
    if (res.statusCode === 0) {
      staffStore.setIsLogin(true);
      toast.add({
        severity: "success",
        summary: "Xin chào admin",
        detail: res.message,
        life: 2000,
      });
      router.push("/admin");
      // window.location.replace("/admin");
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Đăng nhập",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
});
</script>
<template>
  <Toast></Toast>
  <div class="h-screen flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center flex-shrink-0">
            <a
              class="py-2 text-5xl font-bold text-blue-500 lg:inline-block"
              href="/"
              >AutoVision
            </a>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Đăng nhập với tài khoản admin
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Hãy
            {{ " " }}
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              quản lý shop của bạn
            </a>
          </p>
        </div>

        <div class="mt-8">
          <div>
            <div class="mt-6 relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Đăng nhập ngay
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form @submit="onSubmit" class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    v-bind="email"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <span class="text-sm text-red-500 italic">{{
                  errors.email
                }}</span>
              </div>

              <div class="space-y-1">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    v-bind="password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <span class="text-sm text-red-500 italic">{{
                  errors.password
                }}</span>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1554192460-c1898f833545?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  </div>
</template>

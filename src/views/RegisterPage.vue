<script setup lang="ts">
import { ref } from "vue";

import { useForm } from "vee-validate";
import * as yup from "yup";
import { UserService } from "../services";
const { values, errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Email không hợp lệ").required("Email trống"),
    HoTenKH: yup
      .string()
      .min(3, "Tên phải có ít nhất 3 ký tự")
      .required("Tên người dùng trống"),
    SoDienThoai: yup
      .string()
      .required("Số điện thoại trống")
      .matches(
        /((09|03|07|08|05)+([0-9]{8})\b)/g,
        "Số điện thoại không hợp lệ"
      ),
    DiaChi: yup
      .string()
      .required("Thiếu địa chỉ")
      .min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
    password: yup
      .string()
      .required("Mật khẩu trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    repassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu không đúng")
      .required("Mật khẩu xác nhận trống"),
  }),
});

const email = defineInputBinds("email");
const SoDienThoai = defineInputBinds("SoDienThoai");
const password = defineInputBinds("password");
const DiaChi = defineInputBinds("DiaChi");
const HoTenKH = defineInputBinds("HoTenKH");
const repassword = defineInputBinds("repassword");

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await UserService.Register(values);
    if (res.statusCode === 0) {
      console.log("res.data", res.data);
      alert(res.message);
    }
  } catch (error) {
    const err = error as Error;
    alert(err.message);
    console.log("error", error.response.data.message);
  }
});
</script>

<template>
  <div
    class="mt-16 mb-20 border flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-full"
  >
    <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
      <div class="flex justify-center mx-auto">
        <a
          class="hidden text-2xl lg:inline-block py-2 text-blue-500 font-bold underline underline-offset-4"
          href="/"
          >AutoVision
        </a>
      </div>

      <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
        Hãy trở thành một phần của chúng tôi
      </p>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

        <a
          href="#"
          class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >Đăng ký ngay</a
        >

        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
      </div>

      <form @submit="onSubmit">
        <div class="flex gap-3">
          <div class="mt-4 w-1/2">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="HoTenKH"
              >Họ và tên:
            </label>
            <input
              v-bind="HoTenKH"
              id="HoTenKH"
              class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
            <span class="text-sm text-red-500 italic">{{
              errors.HoTenKH
            }}</span>
          </div>

          <div class="mt-4 w-1/2">
            <div class="flex justify-between">
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="SoDienThoai"
                >Số điện thoại:</label
              >
            </div>

            <input
              v-bind="SoDienThoai"
              id="SoDienThoai"
              class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="tel"
            />
            <span class="text-sm text-red-500 italic">{{
              errors.SoDienThoai
            }}</span>
          </div>
        </div>

        <div class="mt-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="email"
            >Email:
          </label>
          <input
            id="email"
            v-bind="email"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
          <span class="text-sm text-red-500 italic">{{ errors.email }}</span>
        </div>

        <div class="flex gap-3">
          <div class="mt-4 w-1/2">
            <div class="flex justify-between">
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="password"
                >Mật khẩu:</label
              >
            </div>

            <input
              id="password"
              v-bind="password"
              class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
            <span class="text-sm text-red-500 italic">{{
              errors.password
            }}</span>
          </div>

          <div class="mt-4 w-1/2">
            <div class="flex justify-between">
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="repassword"
                >Nhập lại mật khẩu:</label
              >
            </div>

            <input
              id="repassword"
              v-bind="repassword"
              class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
            <span class="text-sm text-red-500 italic">{{
              errors.repassword
            }}</span>
          </div>
        </div>

        <div class="mt-4">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="DiaChi"
              >Địa chỉ:</label
            >
          </div>

          <input
            id="DiaChi"
            v-bind="DiaChi"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
          <span class="text-sm text-red-500 italic">{{ errors.DiaChi }}</span>
        </div>

        <div class="mt-6">
          <button
            class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Đăng ký
          </button>
        </div>
      </form>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

        <RouterLink
          class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          to="/login"
        >
          hoặc đăng nhập
        </RouterLink>

        <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
    <div
      class="hidden bg-cover lg:block lg:w-1/2"
      style="
        background-image: url('https://images.unsplash.com/photo-1593142871910-2a967580ecdc?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      "
    ></div>
  </div>
</template>

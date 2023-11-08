<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { AuthService } from "../services";
const { values, errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Email không hợp lệ").required("Email trống"),
    password: yup
      .string()
      .required("Mật khẩu trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  }),
});

const email = defineInputBinds("email");

const password = defineInputBinds("password");

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await AuthService.login(values.email, values.password);
    if (res.statusCode === 0) {
      window.location.replace("/");
    }
  } catch (error) {
    const err = error as Error;
    throw err;
  }
});
</script>

<template>
  <div
    class="mt-24 mb-20 border flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-full"
  >
    <div
      class="hidden bg-cover lg:block lg:w-1/2"
      style="
        background-image: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      "
    ></div>

    <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
      <div class="flex justify-center mx-auto">
        <a
          class="hidden text-2xl lg:inline-block py-2 text-blue-500 font-bold underline underline-offset-4"
          href="/"
          >AutoVision
        </a>
      </div>

      <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
        Chào mừng bạn trở lại
      </p>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/3"></span>

        <a
          href="#"
          class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >Đăng nhập ngay</a
        >

        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/3"></span>
      </div>

      <form @submit="onSubmit">
        <div class="mt-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="LoggingEmailDiaChi"
            >Email:
          </label>
          <input
            v-bind="email"
            id="LoggingEmailDiaChi"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
          <span class="text-sm text-red-500 italic">{{ errors.email }}</span>
        </div>

        <div class="mt-4">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="loggingpassword"
              >Mật khẩu:</label
            >
          </div>

          <input
            v-bind="password"
            id="loggingpassword"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
          <span class="text-sm text-red-500 italic">{{ errors.password }}</span>
        </div>

        <div class="mt-6">
          <button
            class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Đăng nhập
          </button>
        </div>
      </form>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 md:w-1/3"></span>
        <RouterLink
          class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          to="/register"
        >
          hoặc đăng ký
        </RouterLink>

        <span class="w-1/5 border-b dark:border-gray-600 md:w-1/3"></span>
      </div>
    </div>
  </div>
</template>

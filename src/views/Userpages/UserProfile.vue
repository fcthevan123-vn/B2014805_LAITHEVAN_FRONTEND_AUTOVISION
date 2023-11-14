<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-blue-500">
      Thống kê về tài khoản của bạn
    </h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        v-for="item in stats"
        :key="item.name"
        class="px-4 py-5 bg-white border border-l-8 border-l-blue-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ item.stat }}
        </dd>
      </div>
    </dl>
  </div>

  <div class="bg-white border mt-10 shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-blue-500">
            Thông tin cá nhân
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Bạn có thể chỉnh sửa thông tin cá nhân của mình
          </p>
        </div>

        <button
          class="bg-blue-500 py-1 px-2 rounded-lg text-white hover:opacity-80"
        >
          Sửa
        </button>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Họ và tên</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.HoTenKH }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.email }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Địa chỉ</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.DiaChi }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Số điện thoại</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.SoDienThoai }}
          </dd>
        </div>

        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Tham gia từ</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ moment(userData.createdAt).format("DD/MM/YYYY") }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "../../stores/userStore";
import moment from "moment";
const userStore = useUserStore();
const userData = userStore.getUser();
const stats = [
  { name: "Số lần đặt hàng", stat: "71,897" },
  { name: "Số đơn thành công", stat: "58.16%" },
  { name: "Số tiền đã chi", stat: "24.57%" },
];
</script>

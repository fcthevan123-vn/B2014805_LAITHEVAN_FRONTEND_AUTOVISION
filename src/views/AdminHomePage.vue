<template>
  <div>
    <div>
      <h3 class="text-2xl my-6 leading-6 font-medium text-blue-500">
        Thống kê về AutoVision
      </h3>
      <dl class="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-blue-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Tổng số đơn đặt hàng
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.totalOrder }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-purple-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Số đơn đặt hàng trong ngày
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.dailyOrder }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-green-600 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Số đơn thành công
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.totalSucessOrder }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-teal-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Số tiền đã thu được (VND)
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.totalPay.toLocaleString("vi") }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-orange-600 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Số tài khoản trên hệ thống
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.allUsers }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white border border-l-8 border-l-yellow-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Tổng số sản phẩm
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ statistic.totalProduct }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrderService } from "../services";
import { onMounted } from "vue";
import { ref } from "vue";

onMounted(() => {
  getStatistic();
});
const statistic = ref({
  totalOrder: 0,
  totalPay: 0,
  totalSucessOrder: 0,
  allUsers: 0,
  dailyOrder: 0,
  totalProduct: 0,
});

const getStatistic = async () => {
  try {
    const res = await OrderService.AdminStatistic();
    if (res.statusCode === 0) {
      statistic.value = res.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
</script>

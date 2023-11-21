<template>
  <div class="bg-white">
    <main
      v-if="isShow"
      class="max-w-2xl min-h-screen mx-auto pt-8 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Giỏ hàng của bạn
      </h1>

      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="border-t border-b border-gray-200 divide-y divide-gray-200"
          >
            <li
              v-for="(cart, index) in carts"
              :key="index"
              class="flex py-6 sm:py-10"
            >
              <CartCard
                :data="cart"
                @handleGetCart="handleGetCart(id as string)"
              ></CartCard>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 bg-gray-50 rounded-2xl border px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Tổng quan giỏ hàng
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Tiền gốc</dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ allPrice.toLocaleString("vi") }} VND
              </dd>
            </div>

            <!-- <div
              class="border-t border-gray-200 pt-4 flex items-center justify-between"
            >
              <dt class="flex text-sm text-gray-600">
                <span>Thuế (2%)</span>
                <a
                  href="#"
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only"
                    >Learn more about how tax is calculated</span
                  >
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ taxPrice.toLocaleString("vi") }} VND
              </dd>
            </div> -->
            <div
              class="border-t border-gray-200 pt-4 flex items-center justify-between"
            >
              <dt class="text-base font-medium text-gray-900">Tổng giá tiền</dt>
              <dd class="text-base font-medium text-gray-900">
                {{ totalPrice.toLocaleString("vi") }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="button"
              @click="open = true"
              class="w-full bg-blue-600 border border-transparent rounded-2xl shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
            >
              Thanh toán
            </button>
          </div>
        </section>
      </form>
    </main>
    <div v-else>
      <div class="grid h-screen px-4 bg-white place-content-center">
        <div class="text-center">
          <img
            src="../assets/images/empty_cart.svg"
            alt="Image"
            style="width: 300px"
          />

          <h1
            class="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Giỏ hàng đang trống
          </h1>

          <p class="mt-4 text-gray-500 mb-5">
            Hãy thêm ngay một sản phẩm vào thôi nào!
          </p>
          <RouterLink to="/all-products">
            <Button size="small" label="Thêm ngay" class="rounded-xl"
          /></RouterLink>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="open"
    modal
    header="Xác nhận đặt hàng"
    :style="{ width: '70rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="sm:grid sm:grid-cols-5 sm:gap-12 flex flex-col">
      <div class="grid-cols-1 col-span-3">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="border-t border-b border-gray-200 divide-y divide-gray-200"
          >
            <li
              v-for="(cart, index) in carts"
              :key="index"
              class="flex py-6 sm:py-10"
            >
              <CartCard
                :isSmall="true"
                :data="cart"
                @handleGetCart="handleGetCart(id as string)"
              ></CartCard>
            </li>
          </ul>
        </section>
        <div class="flex justify-between items-center">
          <p class="font-bold mt-3">Tổng giá tiền:</p>
          <p class="font-bold mt-3">
            {{ totalPrice.toLocaleString("vi") }} VND
          </p>
        </div>
      </div>
      <div class="grid-cols-2 col-span-2">
        <div class="rounded-xl p-3 border border-sky-500 bg-gray-50 shadow-md">
          <p class="font-semibold text-center text-lg mb-2">
            Thông tin người nhận
          </p>
          <form class="flex flex-col gap-5 h-full" @submit="onSubmit">
            <div>
              <label for="HoTenKH" class="block text-sm font-medium">
                Họ và tên
              </label>

              <input
                v-bind="HoTenKH"
                type="text"
                id="HoTenKH"
                placeholder="Họ và tên của bạn"
                class="mt-1 w-full rounded-xl border-gray-200 shadow-sm sm:text-sm"
              />
              <span class="text-sm text-red-500 italic">{{
                errors.HoTenKH
              }}</span>
            </div>
            <div>
              <label for="DiaChi" class="block text-sm font-medium">
                Địa chỉ nhận hàng
              </label>

              <input
                v-bind="DiaChi"
                type="text"
                id="DiaChi"
                placeholder="Địa chỉ nhận hàng"
                class="mt-1 w-full rounded-xl border-gray-200 shadow-sm sm:text-sm"
              />
              <span class="text-sm text-red-500 italic">{{
                errors.DiaChi
              }}</span>
            </div>

            <div>
              <label for="SoDienThoai" class="block text-sm font-medium">
                Số điện thoại
              </label>

              <input
                type="text"
                v-bind="SoDienThoai"
                id="SoDienThoai"
                placeholder="Số điện thoại"
                class="mt-1 w-full rounded-xl border-gray-200 shadow-sm sm:text-sm"
              />
              <span class="text-sm text-red-500 italic">{{
                errors.SoDienThoai
              }}</span>
            </div>

            <Button
              type="submit"
              label="Đặt hàng ngay
              "
              class="rounded-xl mt-5"
              size="small"
            />
          </form>
        </div>
      </div>
    </div>
  </Dialog>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";
import CartService from "../services/cartService";
import CartCard from "../components/cards/CartCard.vue";
import { useUserStore } from "../stores/userStore";
import Toast from "primevue/toast";
import { useForm } from "vee-validate";
import * as yup from "yup";
import OrderService from "../services/orderService";
import { useToast } from "primevue/usetoast";
import { ConvertErrorMessage } from "../utils/importAllComponent";
import router from "../router";

const { setValues, errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
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
    HoTenKH: yup
      .string()
      .min(3, "Tên phải có ít nhất 3 ký tự")
      .required("Tên người dùng trống"),
  }),
});

const toast = useToast();

const HoTenKH = defineInputBinds("HoTenKH");
const DiaChi = defineInputBinds("DiaChi");
const SoDienThoai = defineInputBinds("SoDienThoai");

const route = useRoute();

const open = ref(false);
const id = ref(route.params.id);
const carts = ref();
const isShow = ref(false);
const allPrice = ref(0);
const taxPrice = ref(0);

const totalPrice = computed(() => {
  return allPrice.value;
});

const userStore = useUserStore();

watch(carts, () => {
  allPrice.value = 0;
  taxPrice.value = 0;
  for (let i = 0; i < carts.value.length; i++) {
    allPrice.value +=
      parseInt(carts.value[i].MSHH.Gia) * parseInt(carts.value[i].SoLuong);
  }
  if (carts.value.length > 0) {
    isShow.value = true;
  }
  taxPrice.value = (allPrice.value * 2) / 100;
});

setValues({
  HoTenKH: userStore.getUser().HoTenKH,
  DiaChi: userStore.getUser().DiaChi,
  SoDienThoai: userStore.getUser().SoDienThoai,
});

onMounted(() => {
  handleGetCart(id.value as string);
});

async function handleGetCart(id: string) {
  try {
    const res = await CartService.GetCart(id);
    if (res.statusCode === 0) {
      carts.value = res.data;
      if (res.data.length === 0) {
        isShow.value = false;
      }
    }
  } catch (error) {
    console.log("error", error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const dataPass = {
      MSKH: userStore.getUser()._id,
      DonHang: carts.value,
      ...values,
    };

    const res = await OrderService.CreateOrder(dataPass);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Đặt hàng",
        detail: res.message,
        life: 2000,
      });

      handleGetCart(id.value as string);
      setTimeout(() => router.push("/user/all-orders"), 1000);
      open.value = false;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Đặt hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
});
</script>

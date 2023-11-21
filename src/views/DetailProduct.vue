<template>
  <div class="bg-white">
    <div class="max-w-2xl px-4 py-6 mx-auto sm:py-12 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="image in product?.HinhHH"
                :key="image._id"
                class="relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                v-slot="{ selected }"
              >
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img
                    :src="image.UrlHinh"
                    alt=""
                    class="object-cover object-center w-full h-full"
                  />
                </span>
                <span
                  :class="[
                    selected ? 'ring-blue-500' : 'ring-transparent',
                    'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none',
                  ]"
                  aria-hidden="true"
                />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="w-full aspect-w-1 aspect-h-1">
            <TabPanel v-for="image in product?.HinhHH" :key="image._id">
              <img
                :src="image.UrlHinh"
                class="object-cover object-center w-full h-full sm:rounded-lg"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <div class="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
          <p class="text-lg font-medium text-blue-500">Nike</p>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ product?.TenHH }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-2xl text-gray-900">
              {{
                parseInt(product?.Gia as unknown as string).toLocaleString("vi")
              }}
              VND
            </p>
          </div>

          <div class="mt-3">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <svg
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    mockData.rating > rating
                      ? 'text-orange-400'
                      : 'text-gray-300',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <h3 class="font-medium text-gray-600 text-md">Mô tả:</h3>
            <div
              class="space-y-6 text-sm h-14 break-words text-ellipsis overflow-hidden text-gray-700"
            >
              {{ product?.MoTaHH }}
            </div>
            <h3 class="font-medium mt-5 text-gray-600 text-md">Ghi chú:</h3>
            <div
              class="space-y-6 text-sm h-8 break-words text-ellipsis overflow-hidden text-gray-700"
            >
              {{ product?.GhiChu }}
            </div>
          </div>

          <form class="mt-6">
            <!-- Colors -->
            <div class="mb-6 sm:w-1/2">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="block text-md font-medium text-gray-700">
                  Size
                </ListboxLabel>
                <div class="mt-1 relative">
                  <ListboxButton
                    class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <span class="block truncate">{{ selected.name }}</span>
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                      <SelectorIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        as="template"
                        v-for="size in sizes"
                        :key="size.id"
                        :value="size"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'text-white bg-blue-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          ]"
                        >
                          <span
                            :class="[
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            ]"
                          >
                            {{ size.name }}
                          </span>

                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-blue-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ]"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <!-- <h3 class="font-medium text-gray-600 text-md mb-1">Size:</h3> -->
            </div>
            <div class="mb-6 sm:w-1/2">
              <div class="">
                <h3 class="font-medium text-gray-600 text-md mb-1">
                  Số lượng:
                </h3>
                <p class="text-xs text-gray-600 text-md mb-1">
                  Có {{ product?.SoLuongHang }} sản phẩm
                </p>
                <div class="flex">
                  <input
                    type="number"
                    v-model="quantity"
                    readonly
                    id="SoLuong"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-lg"
                    placeholder="Tối thiểu 1 và tối đa 10"
                  />
                  <div class="flex">
                    <Button
                      icon="pi pi-plus"
                      size="small"
                      aria-label="Filter"
                      class="rounded-none p-0 w-10"
                      @click="handleIncreaseQuantity"
                    />

                    <Button
                      icon="pi pi-minus"
                      aria-label="Filter"
                      severity="danger"
                      @click="handleDecreaseQuantity"
                      class="rounded-none p-0 w-10 rounded-r-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-medium text-gray-600 text-md">Màu sắc</h3>

              <RadioGroup v-model="selectedColor" class="mt-2">
                <RadioGroupLabel class="sr-only">
                  Choose a color
                </RadioGroupLabel>
                <div class="flex items-center space-x-3">
                  <RadioGroupOption
                    as="template"
                    v-for="color in mockData.colors"
                    :key="color.name"
                    :value="color"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        color.selectedColor,
                        active && checked ? 'ring ring-offset-1' : '',
                        !active && checked ? 'ring-2' : '',
                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                      ]"
                    >
                      <RadioGroupLabel as="p" class="sr-only">
                        {{ color.name }}
                      </RadioGroupLabel>
                      <span
                        aria-hidden="true"
                        :class="[
                          color.bgColor,
                          'h-8 w-8 border border-black border-opacity-10 rounded-full',
                        ]"
                      />
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <p class="mt-10 mb-3 text-sm text-red-500">
              {{
                userStore.getStateLogin()
                  ? ""
                  : "Bạn cần đăng nhập để mua hoặc thêm vào giỏ hàng!"
              }}
            </p>
            <div class="flex w-full gap-5 sm:flex-col1">
              <Button
                @click="open = true"
                :disabled="isDisabledBtn"
                label="Mua ngay"
                outlined
                class="w-1/3 rounded-xl"
                severity="info"
              />

              <Button
                :disabled="isLoading || isDisabledBtn"
                outlined
                label="Thêm vào giỏ hàng"
                class="w-1/2 p-1 lg:w-1/3 rounded-xl"
                severity="info"
                @click="handleAddToCart(product?._id as string)"
              />
            </div>
          </form>
        </div>
      </div>
      <div
        class="max-w-2xl mx-auto mt-16 overflow-hidden bg-white border shadow sm:rounded-lg lg:max-w-7xl"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-blue-500">
            Thông tin chi tiết
          </h3>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            Những thông số chính của giày
          </p>
        </div>
        <div class="px-4 py-5 border-t border-gray-200 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Trọng lượng</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Xấp xỉ {{ product?.TrongLuong }}g
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Đế ngoài</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ product?.DeNgoai }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Công nghệ đệm</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ product?.CongNgheDem }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Chất liệu</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ product?.ChatLieu }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phù hợp cho</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ product?.PhuHopVoi }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div class="mb-28"></div>

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
            <h2 id="cart-heading" class="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              class="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              <li class="flex py-6 sm:py-10">
                <div class="flex-shrink-0">
                  <img
                    :src="product?.HinhHH[0]?.UrlHinh || ''"
                    alt="error"
                    class="rounded-md object-center object-cover w-24 h-24"
                  />
                </div>

                <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div
                    class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                  >
                    <div>
                      <div class="flex justify-between">
                        <h3 class="text-sm">
                          <a
                            class="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {{ product?.TenHH }}
                          </a>
                        </h3>
                      </div>
                      <div class="mt-1 flex text-sm">
                        <p class="text-gray-500">{{ selectedColor.name }}</p>
                        <p
                          class="ml-4 pl-4 border-l border-gray-300 text-gray-500"
                        >
                          {{ selected.name }}
                        </p>
                      </div>
                      <p class="text-gray-500 text-sm">
                        Số lượng: {{ quantity }}
                      </p>

                      <!-- <p class="mt-1 text-sm font-medium text-gray-900">
                        gia VND
                      </p> -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <div class="flex justify-between items-center">
            <p class="font-bold mt-3">Tổng giá tiền:</p>
            <p class="font-bold mt-3">
              {{ (quantity * product?.Gia).toLocaleString("vi") }} VND
            </p>
          </div>
        </div>
        <div class="grid-cols-2 col-span-2">
          <div
            class="rounded-xl p-3 border border-sky-500 bg-gray-50 shadow-md"
          >
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

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/vue";

import { useForm } from "vee-validate";
import * as yup from "yup";
import Toast from "primevue/toast";
import { useRoute } from "vue-router";
import { OrderService, ProductService } from "../services";
import { HangHoaTS } from "../utils/allTypeTs";
import { useUserStore } from "../stores/userStore";
import router from "../router";
import { useToast } from "primevue/usetoast";
import CartService from "../services/cartService";
import { ConvertErrorMessage } from "../utils/importAllComponent";
const mockData = {
  rating: 4,
  colors: [
    {
      name: "Đen",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "Trắng", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Xám",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
    {
      name: "Xanh",
      bgColor: "bg-blue-500",
      selectedColor: "ring-blue-500",
    },
  ],
};

const sizes = [
  { id: 1, name: "36" },
  { id: 2, name: "37" },
  { id: 3, name: "38" },
  { id: 4, name: "39" },
  { id: 5, name: "40" },
  { id: 6, name: "41" },
  { id: 7, name: "42" },
  { id: 8, name: "43" },
  { id: 9, name: "44" },
];

const open = ref(false);
const selected = ref(sizes[1]);
const quantity = ref(1);
const product = ref<HangHoaTS>();
const selectedColor = ref(mockData.colors[0]);
const route = useRoute();
const id = ref(route.params.id);
const userStore = useUserStore();
const toast = useToast();
const isLoading = ref(false);

const isDisabledBtn = computed(() => {
  if (!userStore.getStateLogin()) {
    return true;
  }
  if (product.value) {
    return product?.value?.SoLuongHang > 0 ? false : true;
  }

  return false;
});

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

const HoTenKH = defineInputBinds("HoTenKH");
const DiaChi = defineInputBinds("DiaChi");
const SoDienThoai = defineInputBinds("SoDienThoai");

setValues({
  HoTenKH: userStore.getUser().HoTenKH,
  DiaChi: userStore.getUser().DiaChi,
  SoDienThoai: userStore.getUser().SoDienThoai,
});

const handleIncreaseQuantity = () => {
  if (quantity.value === 10) {
    return toast.add({
      severity: "warn",
      summary: "Quá số lượng",
      detail: "Tối đa là 10",
      life: 2000,
    });
  }
  if (quantity.value == product.value?.SoLuongHang) {
    return toast.add({
      severity: "warn",
      summary: "Quá số lượng",
      detail: `Sản phẩm này chỉ có ${product.value?.SoLuongHang} sản phẩm`,
      life: 2000,
    });
  }
  return quantity.value++;
};

const handleDecreaseQuantity = () => {
  if (quantity.value === 1) {
    return toast.add({
      severity: "warn",
      summary: "Lỗi số lượng",
      detail: "Tối thiểu phải là 1",
      life: 2000,
    });
  }
  return quantity.value--;
};

async function handleAddToCart(id: string) {
  if (!userStore.getStateLogin()) {
    router.push("/login");
  } else {
    isLoading.value = true;
    const dataPass = {
      MSKH: userStore.getUser()._id,
      MSHH: id,
      SoLuong: quantity.value,
      Size: selected.value.name,
      MauSac: selectedColor.value.name,
    };

    try {
      const res = await CartService.AddToCart(dataPass);
      if (res.statusCode === 0) {
        toast.add({
          severity: "success",
          summary: "Thêm giỏ hàng",
          detail: "Sản phẩm đã được thêm vào giỏ hàng của bạn",
          life: 2000,
        });
      }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      toast.add({
        severity: "warn",
        summary: "Thêm giỏ hàng",
        detail: ConvertErrorMessage(error as Error),
        life: 2000,
      });
    }
  }
}

onMounted(async () => {
  handleGetProduct(id.value as string);
});

async function handleGetProduct(id: string) {
  try {
    const res = await ProductService.getProducById(id);
    if (res.statusCode === 0) {
      product.value = res.data;
    }
  } catch (error) {
    console.log("error", error);
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const dataPass = {
      MSKH: userStore.getUser()._id,
      DonHang: [
        {
          MSKH: userStore.getUser()._id,
          MSHH: product.value,
          SoLuong: quantity.value,
          Size: selected.value.name,
          MauSac: selectedColor.value.name,
        },
      ],
      DiaChi: DiaChi.value.value,
      SoDienThoai: SoDienThoai.value.value,
      HoTenKH: HoTenKH.value.value,
      isBuyNow: true,
    };

    const res = await OrderService.CreateOrder(dataPass);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Đặt hàng",
        detail: res.message,
        life: 2000,
      });
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
    setTimeout(() => window.location.reload(), 1000);
  }
});
</script>

<style scoped>
.p-button {
  padding: 0.5rem 0rem !important;
}
</style>

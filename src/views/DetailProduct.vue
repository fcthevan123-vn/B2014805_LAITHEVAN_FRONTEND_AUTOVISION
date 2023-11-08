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
                    selected ? 'ring-indigo-500' : 'ring-transparent',
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

        <!-- Product info -->
        <div class="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
          <p class="text-lg font-medium text-blue-500">Nike</p>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ product?.TenHH }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-2xl text-gray-900">{{ product?.Gia }}</p>
          </div>

          <!-- Reviews -->
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
            <div class="space-y-6 text-sm text-gray-700">
              {{ product?.MoTaHH }}
            </div>
            <h3 class="font-medium mt-5 text-gray-600 text-md">Ghi chú:</h3>
            <div class="space-y-6 text-sm text-gray-700">
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
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  max="10"
                  oninput="validity.valid||(value='');"
                  id="SoLuong"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tối thiểu 1 và tối đa 10"
                />
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

            <div class="flex w-full gap-5 mt-10 sm:flex-col1">
              <button
                class="flex items-center justify-between w-1/2 gap-4 px-2 py-3 text-blue-500 transition-colors border border-current group rounded-xl hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500"
              >
                <span
                  class="w-full text-sm font-medium text-center transition-colors group-hover:text-white"
                >
                  Mua ngay
                </span>
              </button>

              <button
                @click="handleAddToCart()"
                class="flex items-center justify-between w-1/2 gap-4 px-2 py-3 text-blue-500 transition-colors border border-current group rounded-xl hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500"
              >
                <span
                  class="w-full text-sm font-medium text-center transition-colors group-hover:text-white"
                >
                  Thêm vào giỏ hàng
                </span>
              </button>
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
    <div class="mb-16">
      <RelateProduct></RelateProduct>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
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
import RelateProduct from "../components/relateProduct/RelateProduct.vue";

import { useRoute } from "vue-router";
import { ProductService } from "../services";
import { HangHoaTS } from "../utils/allTypeTs";
import { useUserStore } from "../stores/userStore";
import router from "../router";

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

const selected = ref(sizes[1]);
const quantity = ref(1);
const product = ref<HangHoaTS>();
const selectedColor = ref(mockData.colors[0]);
const route = useRoute();
const id = ref(route.params.id);
const userStore = useUserStore();

async function handleAddToCart() {
  if (!userStore.getStateLogin()) {
    router.push("/login");
  } else {
    alert("add to cart");
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
</script>

<style scoped>
.p-inputtext {
  padding: 0px !important;
}
</style>

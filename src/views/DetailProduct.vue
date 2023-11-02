<template>
  <div class="bg-white mt-4">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div
            class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none"
          >
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="image in product.images"
                :key="image.id"
                class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                v-slot="{ selected }"
              >
                <!-- <span class="sr-only">
                  {{ image.name }}
                </span> -->
                <span class="absolute inset-0 rounded-md overflow-hidden">
                  <img
                    :src="image.src"
                    alt=""
                    class="w-full h-full object-center object-cover"
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
            <TabPanel v-for="image in product.images" :key="image.id">
              <img
                :src="image.src"
                class="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <p class="text-lg font-medium text-blue-500">Sedan</p>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ product.name }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-2xl text-gray-900">{{ product.price }}</p>
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
                    product.rating > rating
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

            <div
              class="text-base text-gray-700 space-y-6"
              v-html="product.description"
            />
          </div>

          <form class="mt-6">
            <!-- Colors -->
            <div>
              <h3 class="text-md font-medium text-gray-600">Màu sắc</h3>

              <RadioGroup v-model="selectedColor" class="mt-2">
                <RadioGroupLabel class="sr-only">
                  Choose a color
                </RadioGroupLabel>
                <div class="flex items-center space-x-3">
                  <RadioGroupOption
                    as="template"
                    v-for="color in product.colors"
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

            <!-- <div class="mt-4">
              <p class="text-lg font-medium text-blue-500 mb-3 mt-8">
                Thông tin chi tiết
              </p>
              <ul class="text-base text-gray-700 space-y-2 pr-8">
                <li>
                  <p class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-point-filled mr-1 text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Chiều cao: từ 1467 mm
                  </p>
                </li>

                <li>
                  <p class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-point-filled mr-1 text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Chiều rộng: từ 1868 mm1
                  </p>
                </li>

                <li>
                  <p class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-point-filled mr-1 text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Chiều dài: từ 4936 mm1
                  </p>
                </li>

                <li>
                  <p class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-point-filled mr-1 text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Công suất tối đa: 523 mã lực tại 5500 vòng/phút2
                  </p>
                </li>
              </ul>
            </div> -->

            <div class="mt-10 flex sm:flex-col1 gap-5 w-full">
              <button
                class="w-1/2 py-3 group flex items-center justify-between gap-4 rounded-xl border border-current px-2 text-blue-500 transition-colors hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500"
              >
                <span
                  class="font-medium text-center w-full text-sm transition-colors group-hover:text-white"
                >
                  Mua ngay
                </span>
              </button>

              <button
                class="w-1/2 py-3 group flex items-center justify-between gap-4 rounded-xl border border-current px-2 text-blue-500 transition-colors hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500"
              >
                <span
                  class="font-medium text-center w-full text-sm transition-colors group-hover:text-white"
                >
                  Thêm vào giỏ hàng
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        class="bg-white border shadow overflow-hidden sm:rounded-lg mt-16 max-w-2xl mx-auto lg:max-w-7xl"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-blue-500">
            Thông tin chi tiết
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Những thông số chính của xe
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Chiều cao</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                từ 1467 mm
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Chiều dài</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                từ 4936 mm1
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Năm sản xuất</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                2023
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Số chỗ</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                5
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Trọng tải</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                > 2 tấn
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/vue";

const product = {
  name: "BMW 5 2023",
  price: "2.000.000.000 VND",
  rating: 4,
  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1541447270888-83e8494f9c06?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
    {
      name: "Blue",
      bgColor: "bg-blue-500",
      selectedColor: "ring-blue-500",
    },
  ],
  description: `
    <p>BMW 5 Series 2023 là biểu tượng của sự sang trọng và hiệu suất. Với nội
        thất đẳng cấp, công nghệ tiên tiến và khả năng vận hành xuất sắc, nó đáp
        ứng mọi kỳ vọng của người lái.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
  ],
};

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  },
  setup() {
    const selectedColor = ref(product.colors[0]);

    return {
      product,
      selectedColor,
    };
  },
};
</script>

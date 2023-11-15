<template>
  <section>
    <div class="container mb-56 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
          Tất cả các sản phẩm
        </h2>

        <p class="mt-4 max-w-md text-gray-500">
          Một kho giày đang dạng mẫu mã, phong cách, dễ dàng phối đồ đang chờ
          bạn khám phá. Hãy xem qua một vòng nhé.
        </p>
      </header>

      <div class="mt-8 flex items-center justify-between">
        <div class="flex rounded border border-gray-100">
          <button
            class="inline-flex h-10 w-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </button>

          <button
            class="inline-flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>

        <!-- <div>
          <label for="SortBy" class="sr-only">SortBy</label>

          <select id="SortBy" class="h-10 rounded border-gray-300 text-sm">
            <option>Sort By</option>
            <option value="Title, DESC">Title, DESC</option>
            <option value="Title, ASC">Title, ASC</option>
            <option value="Price, DESC">Price, DESC</option>
            <option value="Price, ASC">Price, ASC</option>
          </select>
        </div> -->
      </div>

      <ul class="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in products">
          <ShoeHomeCard :data="product"></ShoeHomeCard>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ProductService } from "../services";
import ShoeHomeCard from "../components/cards/ShoeHomeCard.vue";

const products = ref();

onMounted(async () => await handleGetAllProducts());

async function handleGetAllProducts() {
  try {
    const res = await ProductService.getAllProducts();
    if (res.statusCode === 0) {
      products.value = res.data;
    }
  } catch (error) {
    const err = error as Error;
    console.log("error", err.message);
  }
}
</script>

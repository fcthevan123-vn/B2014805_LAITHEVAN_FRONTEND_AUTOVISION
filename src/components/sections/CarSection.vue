<script setup lang="ts">
import CarHomeCard from "../cards/CarHomeCard.vue";
</script>

<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-col flex-wrap w-full mb-8">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-3">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
          >
            Một số mẫu xe
          </h1>
          <div class="h-1 w-40 bg-blue-500 rounded"></div>
        </div>

        <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
          Hãy khám phá danh mục xe của chúng tôi ngay hôm nay và bắt đầu cuộc
          hành trình tới việc sở hữu chiếc xe mà bạn luôn mơ ước!
        </p>

        <p class="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
        <a
          class="lg:w-1/2 w-full leading-relaxed text-blue-500 underline hover:text-blue-700 cursor-pointer"
        >
          Xem thêm
        </a>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <CarHomeCard />
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <CarHomeCard />
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <CarHomeCard />
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <CarHomeCard />
        </div>
      </div>
    </div>
  </section>
</template>

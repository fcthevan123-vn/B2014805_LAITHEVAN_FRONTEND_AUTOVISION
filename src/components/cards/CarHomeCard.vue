<script setup lang="ts">
import PriceBadge from "../badge/PriceBadge.vue";
import ButtonCard from "../buttonCustom/ButtonCard.vue";
</script>

<template>
  <div class="border border-gray-100 p-4 rounded-lg flex flex-col bg-gray-50">
    <a href="/product">
      <img
        class="h-60 rounded-lg w-full object-cover object-center mb-6"
        src="https://w0.peakpx.com/wallpaper/131/398/HD-wallpaper-bmw-5-series-gran-turismo-2017-f07-white-bmw-5-german-cars-bmw.jpg"
        alt="content"
      />
      <h3 class="tracking-widest text-blue-500 text-xs font-medium title-font">
        Sedan
      </h3>
      <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
        BMW 5 2023
      </h2>
      <p class="leading-relaxed text-base">
        BMW 5 Series 2023 là biểu tượng của sự sang trọng và hiệu suất. Với nội
        thất đẳng cấp, công nghệ tiên tiến và khả năng vận hành xuất sắc, nó đáp
        ứng mọi kỳ vọng của người lái.
      </p>
    </a>

    <PriceBadge price="2.000.000.000" />

    <div class="mt-4 flex gap-3">
      <ButtonCard label="Mua ngay" />
      <ButtonCard label="Thêm vào giỏ hàng" />
    </div>
  </div>
</template>

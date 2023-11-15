<script setup lang="ts">
import PriceBadge from "../badge/PriceBadge.vue";
import { HangHoaTS } from "../../utils/allTypeTs";
import { computed } from "vue";
const props = defineProps<{
  data: HangHoaTS;
  isShowAll?: boolean;
}>();

const urlImage = computed(() => {
  if (props.data.HinhHH) {
    return props.data.HinhHH[0].UrlHinh;
  }
});
</script>

<template>
  <div
    class="flex flex-col p-4 w-full duration-200 border border-gray-100 rounded-lg bg-gray-50 hover:scale-105 hover:bg-gray-100 hover:border-gray-200"
  >
    <RouterLink :to="'/product/' + props.data._id">
      <img
        class="object-cover object-center w-full mb-6 rounded-lg h-60"
        :src="urlImage"
        alt="content"
      />
      <h3 class="text-xs font-medium tracking-widest text-blue-500 title-font">
        Sneaker
      </h3>
      <h2 class="mb-4 text-lg truncate font-medium text-gray-900 title-font">
        {{ props.data.TenHH }}
      </h2>
      <p
        class="text-base leading-relaxed h-20 break-words text-ellipsis overflow-hidden"
      >
        {{ props.data.MoTaHH }}
      </p>

      <PriceBadge :price="props.data.Gia" />

      <div v-if="!isShowAll" class="flex gap-3 mt-4">
        <button
          class="bg-blue-500 w-full py-1 rounded-lg hover:bg-blue-600 text-white"
        >
          Xem chi tiết
        </button>
      </div>
    </RouterLink>
  </div>
</template>

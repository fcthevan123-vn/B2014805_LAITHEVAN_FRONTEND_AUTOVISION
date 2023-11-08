<script setup lang="ts">
import PriceBadge from "../badge/PriceBadge.vue";
import ButtonCard from "../buttonCustom/ButtonCard.vue";
import { HangHoaTS } from "../../utils/allTypeTs";
import { computed } from "vue";
const props = defineProps<{
  data: HangHoaTS;
}>();

const urlImage = computed(() => {
  if (props.data.HinhHH) {
    return props.data.HinhHH[0].UrlHinh;
  }
});
</script>

<template>
  <div
    class="flex flex-col p-4 duration-200 border border-gray-100 rounded-lg bg-gray-50 hover:scale-105 hover:bg-gray-100 hover:border-gray-200"
  >
    <RouterLink :to="'product/' + props.data._id">
      <img
        class="object-cover object-center w-full mb-6 rounded-lg h-60"
        :src="urlImage"
        alt="content"
      />
      <h3 class="text-xs font-medium tracking-widest text-blue-500 title-font">
        Sneaker
      </h3>
      <h2 class="mb-4 text-lg font-medium text-gray-900 title-font">
        {{ props.data.TenHH }}
      </h2>
      <p class="text-base leading-relaxed">
        {{ props.data.MoTaHH }}
      </p>
    </RouterLink>

    <PriceBadge :price="props.data.Gia" />

    <div class="flex gap-3 mt-4">
      <ButtonCard label="Mua ngay" />
      <ButtonCard label="Thêm vào giỏ hàng" />
    </div>
  </div>
</template>

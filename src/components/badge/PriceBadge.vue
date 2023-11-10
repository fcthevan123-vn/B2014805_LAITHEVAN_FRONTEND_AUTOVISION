<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  price: { type: Number, required: true },
});

const priceConvert = computed(() => {
  return parseInt(props.price as unknown as string).toLocaleString("vi");
});
</script>

<template>
  <span
    class="w-fit flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700 mt-4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-coin"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path
        d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"
      ></path>
      <path d="M12 7v10"></path>
    </svg>

    <p class="whitespace-nowrap text-sm ml-2 mt-1">{{ priceConvert }} VND</p>
  </span>
</template>

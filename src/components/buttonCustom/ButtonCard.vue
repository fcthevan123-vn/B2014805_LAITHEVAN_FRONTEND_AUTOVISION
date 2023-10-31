<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
});
</script>

<template>
  <button
    class="group flex items-center justify-between gap-4 rounded-md border border-current px-2 py-1 text-blue-600 transition-colors hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500"
  >
    <span class="font-medium text-sm transition-colors group-hover:text-white">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import PriceBadge from "../badge/PriceBadge.vue";
import ButtonCard from "../buttonCustom/ButtonCard.vue";
</script>

<template>
  <div
    class="flex flex-col p-4 duration-200 border border-gray-100 rounded-lg bg-gray-50 hover:scale-105 hover:bg-gray-100 hover:border-gray-200"
  >
    <RouterLink to="/product">
      <img
        class="object-cover object-center w-full mb-6 rounded-lg h-60"
        src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="content"
      />
      <h3 class="text-xs font-medium tracking-widest text-blue-500 title-font">
        Nike
      </h3>
      <h2 class="mb-4 text-lg font-medium text-gray-900 title-font">
        Nike Air Max 90
      </h2>
      <p class="text-base leading-relaxed">
        Nike Air Max 90 là một biểu tượng trong làng giày thể thao. Với thiết kế
        phong cách và công nghệ đệm Max Air, đôi giày này mang lại sự thoải mái
        và phong cách cho mọi hoạt động.
      </p>
    </RouterLink>

    <PriceBadge price="1.500.000" />

    <div class="flex gap-3 mt-4">
      <ButtonCard label="Mua ngay" />
      <ButtonCard label="Thêm vào giỏ hàng" />
    </div>
  </div>
</template>

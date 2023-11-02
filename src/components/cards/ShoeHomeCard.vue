<script setup lang="ts">
import PriceBadge from "../badge/PriceBadge.vue";
import ButtonCard from "../buttonCustom/ButtonCard.vue";
</script>

<template>
  <div
    class="border border-gray-100 p-4 rounded-lg flex flex-col bg-gray-50 hover:scale-105 duration-200 hover:bg-gray-100"
  >
    <RouterLink to="/product">
      <img
        class="h-60 rounded-lg w-full object-cover object-center mb-6"
        src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="content"
      />
      <h3 class="tracking-widest text-blue-500 text-xs font-medium title-font">
        Nike
      </h3>
      <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
        Nike Air Max 90
      </h2>
      <p class="leading-relaxed text-base">
        Nike Air Max 90 là một biểu tượng trong làng giày thể thao. Với thiết kế
        phong cách và công nghệ đệm Max Air, đôi giày này mang lại sự thoải mái
        và phong cách cho mọi hoạt động.
      </p>
    </RouterLink>

    <PriceBadge price="1.500.000" />

    <div class="mt-4 flex gap-3">
      <ButtonCard label="Mua ngay" />
      <ButtonCard label="Thêm vào giỏ hàng" />
    </div>
  </div>
</template>

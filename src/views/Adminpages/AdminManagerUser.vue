<template>
  <div>
    <p class="text-xl font-semibold text-blue-500 mb-5">
      Quản lý tất cả người dùng
    </p>
  </div>
  <div class="card flex justify-content-center">
    <Toast />
  </div>
  <div>
    <div>
      <AllUser></AllUser>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Toast from "primevue/toast";
import AllUser from "../../components/tables/AllUser.vue";
</script>

<style scoped>
.p-button {
  padding: 0.45rem 1rem !important;
  border-radius: 10px;
}
</style>

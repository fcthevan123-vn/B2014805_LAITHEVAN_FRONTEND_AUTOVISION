<template>
  <div>
    <p class="text-xl font-semibold text-blue-500">Quản lý tất cả sản phẩm</p>
  </div>
  <div class="card flex justify-content-center">
    <Toast />
  </div>
  <div>
    <Dialog
      maximizable
      v-model:visible="visible"
      modal
      header="Thêm sản phẩm mới"
      :style="{ width: '50rem' }"
    >
      <FormAddProduct
        @closeModal="closeModal"
        :isUpdate="false"
      ></FormAddProduct>
    </Dialog>

    <div class="flex justify-end mb-6">
      <Button
        class="text-xs"
        label="Thêm sản phẩm mới"
        icon="pi pi-external-link"
        @click="visible = true"
      />
    </div>

    <div>
      <AllProductsTable></AllProductsTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import FormAddProduct from "../../components/forms/FormAddProduct.vue";
import Toast from "primevue/toast";
import AllProductsTable from "../../components/tables/allProductsTable.vue";
const visible = ref(false);

// const toast = useToast();

// const show = () => {
//   toast.add({
//     severity: "info",
//     summary: "Info",
//     detail: "Message Content",
//     life: 2000,
//   });
// };

const closeModal = () => {
  visible.value = false;
};
</script>

<style scoped>
.p-button {
  padding: 0.45rem 1rem !important;
  border-radius: 10px;
}
</style>

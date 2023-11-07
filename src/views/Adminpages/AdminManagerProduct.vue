<template>
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
      <FormAddProduct @closeModal="closeModal"></FormAddProduct>
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
import { useToast } from "primevue/usetoast";
import AllProductsTable from "../../components/tables/allProductsTable.vue";
const visible = ref(false);

const toast = useToast();

const show = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Message Content",
    life: 2000,
  });
};

const closeModal = () => {
  visible.value = false;
};
</script>

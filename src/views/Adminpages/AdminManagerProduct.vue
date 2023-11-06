<template>
  <div class="card flex justify-content-center">
    <Toast />
    <Button label="Show" @click="show()" />
  </div>
  <div>
    <Dialog
      maximizable
      v-model:visible="visible"
      modal
      header="Thêm sản phẩm mới"
      :style="{ width: '50rem' }"
    >
      <FormAddProduct></FormAddProduct>
    </Dialog>

    <div class="flex justify-end mb-6">
      <Button label="Show" icon="pi pi-external-link" @click="visible = true" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import FormAddProduct from "../../components/forms/FormAddProduct.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const visible = ref(false);

const toastd = useToast();

const show = () => {
  toastd.add({
    severity: "info",
    summary: "Info",
    detail: "Message Content",
    life: 2000,
  });
};
</script>

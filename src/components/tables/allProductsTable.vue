<template>
  <div class="card">
    <DataTable showGridlines :value="products" tableStyle="min-width: 50rem">
      <Column field="TenHH" header="Tên sản phẩm" class="text-sm"></Column>

      <Column field="Gia" header="Giá" class="text-sm">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.Gia) }} VND
        </template>
      </Column>
      <Column field="SoLuongHang" header="Số lượng" class="text-sm"></Column>

      <Column field="ChatLieu" header="Chất liệu" class="text-sm"></Column>

      <Column
        field="TrongLuong"
        header="Trọng lượng(g)"
        class="text-sm"
      ></Column>

      <Column
        field="CongNgheDem"
        header="Công nghệ đệm"
        class="text-sm"
      ></Column>

      <Column field="DeNgoai" header="Đế ngoài" class="text-sm"></Column>

      <Column field="NoiBat" header="Nổi bật" class="text-sm">
        <template #body="slotProps">
          {{ slotProps.data.NoiBat ? "Có" : "Không" }}
        </template>
      </Column>

      <Column header="#">
        <template #body="slotProps">
          <div class="card flex gap-2">
            <Button label="Chỉnh sửa" class="text-xs" @click="visible = true" />
            <Button severity="danger" label="Xoá" class="text-xs" />
          </div>

          <Dialog
            maximizable
            v-model:visible="visible"
            modal
            header="Thêm sản phẩm mới"
            :style="{ width: '50rem' }"
          >
            <FormAddProduct :data="slotProps.data"></FormAddProduct>
          </Dialog>
        </template>
      </Column>

      <template #footer>
        <p class="text-sm">
          Tổng cộng {{ products ? products.length : 0 }} sản phẩm.
        </p>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Column from "primevue/Column";
import DataTable from "primevue/datatable";
import { ProductService } from "../../services";
import Image from "primevue/image";

import FormAddProduct from "../../components/forms/FormAddProduct.vue";

const products = ref();
const visible = ref(false);

onMounted(async () => {
  await handleGetAllProducts();
});

const displayBasic = ref(false);

async function handleGetAllProducts() {
  try {
    const res = await ProductService.getAllProducts();
    if (res.statusCode === 0) {
      products.value = res.data;
    }
  } catch (error) {
    const err = error as Error;

    console.log("error", err.message);
  }
}

const formatCurrency = (value: string) => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
</script>

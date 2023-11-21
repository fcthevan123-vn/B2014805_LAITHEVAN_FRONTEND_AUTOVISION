<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      showGridlines
      dataKey="_id"
      :value="products"
      :globalFilterFields="['TenHH']"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div class="flex justify-end">
          <div class="flex items-center">
            <input
              v-model="filters['global'].value"
              type="text"
              placeholder="Nhập tên sản phẩm"
              class="rounded-l-xl h-9 text-sm font-normal"
            />
            <button class="px-2 h-9 bg-blue-600 rounded-r-xl text-white">
              <IconSearch class="h-5"></IconSearch>
            </button>
          </div>
        </div>
      </template>
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

      <!-- <Column field="NoiBat" header="Nổi bật" class="text-sm">
        <template #body="slotProps">
          {{ slotProps.data.NoiBat ? "Có" : "Không" }}
        </template>
      </Column> -->

      <Column header="#">
        <template #body="{ data }">
          <div class="card flex gap-2">
            <Button label="Sửa" class="text-xs" @click="handlePassData(data)" />
            <Button
              :key="data._id"
              :loading="loading"
              @click="
                {
                  handlePassDataDelete(data);
                }
              "
              severity="danger"
              label="Xoá"
              class="text-xs"
            />
          </div>
        </template>
      </Column>

      <template #empty>
        <p class="text-sm text-center text-orange-500 font-medium italic">
          Không có dữ liệu
        </p>
      </template>

      <template #footer>
        <p class="text-sm">
          Tổng cộng {{ products ? products.length : 0 }} sản phẩm.
        </p>
      </template>
    </DataTable>

    <ConfirmDialog></ConfirmDialog>

    <Dialog
      maximizable
      v-model:visible="visible"
      modal
      header="Cập nhật sản phẩm"
      :style="{ width: '50rem' }"
    >
      <FormAddProduct
        :data="dataPassForm"
        @handleGetAllProducts="handleGetAllProducts"
        @close-modal="closeModal"
        :isUpdate="true"
      ></FormAddProduct>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ProductService } from "../../services";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";
import FormAddProduct from "../../components/forms/FormAddProduct.vue";
import { HangHoaTS } from "../../utils/allTypeTs";
import { FilterMatchMode } from "primevue/api";
import InputText from "primevue/inputtext";
import { IconSearch } from "@tabler/icons-vue";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const products = ref();
const visible = ref(false);
const dataPassForm = ref();
const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);

onMounted(async () => {
  await handleGetAllProducts();
});

const deleteProduct = async (id: string) => {
  loading.value = true;
  try {
    const res = await ProductService.deleteProduct(id);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Xoá sản phẩm",
        detail: "Bạn đã xoá sản phẩm thành công",
        life: 2000,
      });
      handleGetAllProducts();
    }
    loading.value = false;
  } catch (error) {
    const err = error as Error;
    console.log("error", err.message);
  }
};

const confirmDeleteProduct = (id: string) => {
  confirm.require({
    message: "Bạn có chắc chắn xoá sản phẩm này không?",
    header: "Xác nhận xoá sản phẩm",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-text p-button-text",
    acceptClass: "p-button-danger p-button-text",
    acceptLabel: "Có",
    rejectLabel: "Không",
    accept: () => {
      deleteProduct(id);
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const handlePassData = (data: HangHoaTS) => {
  dataPassForm.value = data;
  visible.value = true;
};

const handlePassDataDelete = (data: HangHoaTS) => {
  dataPassForm.value = data;
  confirmDeleteProduct(dataPassForm.value._id);
};

const closeModal = () => {
  visible.value = false;
};

const handleGetAllProducts = async () => {
  try {
    const res = await ProductService.getAllProducts();
    if (res.statusCode === 0) {
      products.value = res.data;
    }
  } catch (error) {
    const err = error as Error;
    console.log("error", err.message);
  }
};

const formatCurrency = (value: string) => {
  return parseInt(value).toLocaleString("vi");
};
</script>

<style scoped>
.p-button {
  padding: 0.45rem 1rem !important;
  border-radius: 10px;
}
</style>

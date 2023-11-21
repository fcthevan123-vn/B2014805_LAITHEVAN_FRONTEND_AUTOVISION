<template>
  <div class="card">
    <DataTable
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      showGridlines
      :value="users"
      tableStyle="min-width: 50rem"
    >
      <Column field="HoTenKH" header="Tên người dùng" class="text-sm"></Column>

      <Column field="SoDienThoai" header="Số điện thoại" class="text-sm">
      </Column>
      <Column field="email" header="Email" class="text-sm"></Column>

      <Column field="DiaChi" header="Địa chỉ" class="text-sm"></Column>

      <Column field="BiKhoa" header="Trạng thái" class="text-sm">
        <template #body="slotProps">
          <span
            v-if="slotProps.data.BiKhoa"
            class="bg-red-500 px-2 py-1 text-white rounded-lg"
            >Bị khoá</span
          >

          <span v-else class="bg-blue-500 px-2 py-1 text-white rounded-lg"
            >Bình thường</span
          >
        </template></Column
      >

      <Column header="#">
        <template #body="{ data }">
          <div class="card flex gap-2">
            <Button
              v-if="data.BiKhoa"
              :key="data._id"
              :loading="loading"
              @click="
                {
                  handlePassDataLock(data, 'mở khoá tài khoản', false);
                }
              "
              severity="info"
              label="Mở khoá"
              class="text-xs"
            />
            <Button
              v-else
              :key="data._id + 1123"
              :loading="loading"
              @click="
                {
                  handlePassDataLock(data, 'khoá tài khoản', true);
                }
              "
              severity="danger"
              label="Khoá"
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
          Tổng cộng {{ users ? users.length : 0 }} người dùng.
        </p>
      </template>
    </DataTable>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { UserService } from "../../services";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";
import { UserTS } from "../../utils/allTypeTs";
import { useStaffStore } from "../../stores/staffStore";
import { ConvertErrorMessage } from "../../utils/importAllComponent";

const users = ref<UserTS[]>();
const dataPassForm = ref();
const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);
const staffStore = useStaffStore();

onMounted(async () => {
  if (staffStore.getStaff()._id.length > 0) {
    handleGetAllUsers();
  }
});

const lockUser = async (id: string, message: string, status: boolean) => {
  loading.value = true;
  const dataSend = {
    id: staffStore.getStaff()._id,
    userId: id,
    status: status,
  };
  try {
    const res = await UserService.DeleteUserByAdmin(dataSend);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: message,
        detail: res.message,
        life: 2000,
      });
      handleGetAllUsers();
    }
    loading.value = false;
  } catch (error) {
    toast.add({
      severity: "success",
      summary: message,
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

const confirmDeleteProduct = (id: string, message: string, status: boolean) => {
  confirm.require({
    message: `Bạn có chắc chắn ${message} này không?`,
    header: `Xác nhận ${message}`,
    icon: "pi pi-info-circle",
    rejectClass: "p-button-text p-button-text",
    acceptClass: "p-button-danger p-button-text",
    acceptLabel: "Có",
    rejectLabel: "Không",
    accept: () => {
      lockUser(id, message, status);
    },
  });
};

const handlePassDataLock = (data: any, message: string, status: boolean) => {
  dataPassForm.value = data;
  confirmDeleteProduct(dataPassForm.value._id, message, status);
};

const handleGetAllUsers = async () => {
  try {
    const res = await UserService.GetAllUserByAdmin({
      id: staffStore.getStaff()._id,
    });
    if (res.statusCode === 0) {
      users.value = res.data;
    }
  } catch (error) {
    const err = error as Error;
    console.log("error", err.message);
  }
};
</script>

<style scoped>
.p-button {
  padding: 0.45rem 1rem !important;
  border-radius: 10px;
}
</style>

<template>
  <div class="flex justify-between mb-5 items-center">
    <p class="text-sky-500 font-semibold text-xl">
      Tất cả đơn đặt hàng của bạn
    </p>
    <Dropdown
      v-model="selectedStatus"
      :options="statuses"
      optionLabel="name"
      placeholder="Chọn trạng thái"
      class="lg:w-1/5 w-1/2 rounded-xl text-xs"
    />
  </div>
  <div class="card">
    <DataTable
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      showGridlines
      :value="orders"
      tableStyle="min-width: 50rem"
    >
      <template #groupheader="slotProps">
        <span
          class="text-sm vertical-align-middle ml-2 font-bold line-height-3"
          >{{ slotProps.data._id }}</span
        >
      </template>

      <Column field="DiaChi" header="Thông tin sản phẩm" class="text-sm">
        <template #body="slotProps">
          <div v-for="data in slotProps.data.SoDonDH">
            <div class="mb-4">
              <p class="font-semibold">
                {{ data.MSHH.TenHH }}
              </p>
              <button
                class="bg-blue-500 text-white text-xs py-1 px-2 rounded-md"
                @click="
                  (e) => {
                    toggle(e);
                    setDataOverlay(data);
                  }
                "
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </template>
      </Column>

      <OverlayPanel ref="op">
        <div class="flex flex-col gap-1">
          <p class="text-xs">Số lượng: {{ dataOverlay.SoLuong }}</p>
          <p class="text-xs">Size: {{ dataOverlay.Size }}</p>
          <p class="text-xs">Màu sắc: {{ dataOverlay.MauSac }}</p>
          <p class="text-xs">
            Giá tiền:
            {{ parseInt(dataOverlay.GiaDatHang).toLocaleString("vi") }} VND
          </p>
        </div>
      </OverlayPanel>

      <Column field="ChatLieu" header="Thông tin người nhận" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-semibold">
              {{ slotProps.data.HoTenNguoiNhan }}
            </p>
            <p class="text-xs">
              {{ slotProps.data.DiaChi }}
            </p>
            <p class="text-xs">
              {{ slotProps.data.SoDienThoai }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Ngày đặt hàng" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-semibold">
              {{ moment(slotProps.data.NgayDH).format("DD/MM/YYYY") }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Ngày giao hàng" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-semibold">
              {{
                slotProps.data.NgayGH
                  ? moment(slotProps.data.NgayGH).format("DD/MM/YYYY")
                  : "..."
              }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="GiaTien" header="Tổng giá tiền" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-base text-center">
              {{ totalPrice(slotProps.data.SoDonDH) }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Trạng thái" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p
              class="text-xs text-center text-white p-1 rounded-md"
              :class="{
                'bg-blue-500': slotProps.data.TrangThai == 'Chờ xác nhận',
                'bg-red-500': slotProps.data.TrangThai == 'Đã huỷ',
                'bg-green-500': slotProps.data.TrangThai == 'Đã xác nhận',
                'bg-emerald-600': slotProps.data.TrangThai == 'Đã giao hàng',
                'bg-teal-500': slotProps.data.TrangThai == 'Đã nhận hàng',
              }"
            >
              {{ slotProps.data.TrangThai }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Nhân viên xác nhận" class="text-sm">
        <template #body="slotProps">
          <div v-if="slotProps.data.MSNV" class="mb-4">
            <p class="font-semibold">{{ slotProps.data.MSNV.HoTenNV }}</p>
            <p class="text-xs">{{ slotProps.data.MSNV.email }}</p>
            <p class="text-xs">{{ slotProps.data.MSNV.SoDienThoai }}</p>
          </div>
          <div v-else>...</div>
        </template>
      </Column>

      <Column header="#">
        <template #body="{ data }">
          <div class="card flex gap-2">
            <button
              v-if="data.TrangThai == 'Chờ xác nhận'"
              class="bg-red-500 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  handlePassDataDelete(data);
                }
              "
            >
              <IconTrash :size="20"></IconTrash>
            </button>

            <button
              v-if="data.TrangThai == 'Đã giao hàng'"
              class="bg-green-500 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  handlePassDataConfirmReceive(data);
                }
              "
            >
              <IconTrash :size="20"></IconTrash>
            </button>
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
          Tổng cộng {{ orders ? orders.length : 0 }} đơn hàng.
        </p>
      </template>
    </DataTable>
    <Toast></Toast>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { OrderService } from "../../services";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";
import { HangHoaTS } from "../../utils/allTypeTs";
import { useUserStore } from "../../stores/userStore";
import { ConvertErrorMessage } from "../../utils/importAllComponent";
import Dropdown from "primevue/dropdown";
import OverlayPanel from "primevue/overlaypanel";
import moment from "moment";
import Toast from "primevue/toast";
import { IconTrash } from "@tabler/icons-vue";

const orders = ref();
const dataPassForm = ref();
const toast = useToast();
const confirm = useConfirm();
const userStore = useUserStore();
const selectedStatus = ref({ name: "Tất cả", code: "Tất cả" });
const statuses = ref([
  { name: "Tất cả", code: "Tất cả" },
  { name: "Chờ xác nhận", code: "Chờ xác nhận" },
  { name: "Đã huỷ", code: "Đã huỷ" },
  { name: "Đã xác nhận", code: "Đã xác nhận" },
  { name: "Đã giao hàng", code: "Đã giao hàng" },
  { name: "Đã nhận hàng", code: "Đã nhận hàng" },
]);

const op = ref();
const dataOverlay = ref();

const setDataOverlay = (data: any) => {
  dataOverlay.value = data;
};
const toggle = (event: any) => {
  op.value.toggle(event);
};

watch(selectedStatus, async () => {
  await handleGetOrderProducts();
});

onMounted(async () => {
  if (userStore.getUser()._id) {
    await handleGetOrderProducts();
  }
});

const handlePassDataDelete = (data: HangHoaTS) => {
  dataPassForm.value = data;
  confirmCancelOrder(dataPassForm.value._id);
  // confirmOrderApi(dataPassForm.value._id, "Đã xác nhận", date.value);
};

const handlePassDataConfirmReceive = (data: HangHoaTS) => {
  dataPassForm.value = data;
  confirmReceive(dataPassForm.value._id);
  // confirmOrderApi(dataPassForm.value._id, "Đã xác nhận", date.value);
};

const confirmCancelOrder = (id: string) => {
  confirm.require({
    message: `Bạn có chắc chắn xoá đơn hàng này không?`,
    header: `Xác nhận xoá đơn hàng`,
    icon: "pi pi-info-circle",
    rejectClass: "p-button-text p-button-text",
    acceptClass: "p-button-danger p-button-text",
    acceptLabel: "Có",
    rejectLabel: "Không",
    accept: () => {
      deleteOrder(id);
    },
  });
};

const confirmReceive = (id: string) => {
  confirm.require({
    message: `Bạn đã nhận đơn hàng này rồi phải không?`,
    header: `Xác nhận đã nhận đơn hàng`,
    icon: "pi pi-info-circle",
    rejectClass: "p-button-text p-button-text",
    acceptClass: "p-button-danger p-button-text",
    acceptLabel: "Có",
    rejectLabel: "Không",
    accept: () => {
      receiveOrder(id);
    },
  });
};

const receiveOrder = async (id: string) => {
  try {
    const res = await OrderService.ConfirmReceive(id);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Đã nhận hàng",
        detail: res.message,
        life: 2000,
      });
      handleGetOrderProducts();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Đã nhận hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

const deleteOrder = async (id: string) => {
  try {
    const res = await OrderService.DeleteOrder(id);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Xoá đơn hàng",
        detail: res.message,
        life: 2000,
      });
      handleGetOrderProducts();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Xoá đơn đặt hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

const totalPrice = (data: any) => {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += parseInt(item.GiaDatHang);
  }
  return totalPrice.toLocaleString("vi") + " VND";
};

const handleGetOrderProducts = async () => {
  try {
    const dataPass = {
      MSKH: userStore.getUser()._id,
      TrangThai: selectedStatus.value.name,
    };

    const res = await OrderService.GetOrderByUserId(dataPass);
    if (res.statusCode === 0) {
      orders.value = res.data;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Lấy danh sách đặt hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};
</script>

<style scoped>
.p-button {
  padding: 0.45rem 1rem !important;
  border-radius: 10px;
}
</style>

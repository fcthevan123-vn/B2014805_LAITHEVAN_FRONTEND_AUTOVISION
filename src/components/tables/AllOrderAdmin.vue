<template>
  <div class="flex justify-between mb-5 items-center">
    <p class="text-sky-500 font-semibold text-xl">
      Tất cả đơn đặt hàng của hệ thống
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
            <div class="mb-4 flex flex-col gap-1">
              <RouterLink
                :to="'/product/' + data.MSHH._id"
                class="font-semibold hover:underline"
              >
                {{ data.MSHH.TenHH }}
              </RouterLink>

              <button
                class="bg-blue-500 w-32 text-white text-xs py-1 px-2 rounded-md"
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

      <Column field="ChatLieu" header="Thông tin người đặt" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-semibold">
              {{ slotProps.data.MSKH.HoTenKH }}
            </p>
            <p class="text-xs">
              {{ slotProps.data.MSKH.email }}
            </p>
            <p class="text-xs">
              {{ slotProps.data.MSKH.SoDienThoai }}
            </p>
          </div>
        </template>
      </Column>

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

      <Column field="GiaTien" header="Tổng giá tiền" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-base text-center">
              {{ totalPrice(slotProps.data.SoDonDH) }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Ngày đặt hàng" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-base">
              {{ moment(slotProps.data.NgayDH).format("DD/MM/YYYY") }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Ngày giao hàng" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p class="font-base">
              {{
                slotProps.data.NgayGH
                  ? moment(slotProps.data.NgayGH).format("DD/MM/YYYY")
                  : "..."
              }}
            </p>
          </div>
        </template>
      </Column>

      <Column field="ChatLieu" header="Trạng thái" class="text-sm">
        <template #body="slotProps">
          <div class="mb-4">
            <p
              class="text-xs text-white p-1 rounded-md text-center"
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
          <div>
            <div v-if="slotProps.data.MSNV" class="mb-4">
              <p class="font-semibold">{{ slotProps.data.MSNV.HoTenNV }}</p>
              <p class="text-xs">{{ slotProps.data.MSNV.email }}</p>
              <p class="text-xs">{{ slotProps.data.MSNV.SoDienThoai }}</p>
            </div>
            <div v-else>...</div>
          </div>
        </template>
      </Column>

      <!-- <Column field="NoiBat" header="Nổi bật" class="text-sm">
            <template #body="slotProps">
              {{ slotProps.data.NoiBat ? "Có" : "Không" }}
            </template>
          </Column> -->

      <Column header="#">
        <template #body="{ data }">
          <div class="card flex gap-2">
            <button
              v-if="data.TrangThai == 'Chờ xác nhận'"
              class="bg-green-500 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  visible = true;
                  dataPassForm = data;
                }
              "
            >
              <IconCheck :size="20"></IconCheck>
            </button>
            <button
              v-if="data.TrangThai == 'Chờ xác nhận'"
              class="bg-red-500 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  handlePassDataUpdate(data, 'huỷ đơn hàng', `Đã huỷ`);
                }
              "
            >
              <IconTrash :size="20"></IconTrash>
            </button>

            <button
              v-if="data.TrangThai == 'Đã xác nhận'"
              class="bg-green-600 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  handlePassDataUpdate(data, 'đã giao hàng', 'Đã giao hàng');
                }
              "
            >
              <IconTruckDelivery :size="20"></IconTruckDelivery>
            </button>

            <button
              v-if="data.TrangThai == 'Đã xác nhận'"
              class="bg-red-500 text-white p-1 rounded-lg hover:opacity-80"
              @click="
                {
                  handlePassDataUpdate(data, 'huỷ đơn hàng', `Đã huỷ`);
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
          Tổng cộng {{ orders ? orders.length : 0 }} đơn đặt hàng.
        </p>
      </template>
    </DataTable>

    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>
    <Dialog
      v-model:visible="visible"
      modal
      header="Xác nhận đơn hàng"
      :style="{ width: '30rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <p class="mb-2">Chọn ngày giao hàng:</p>
      <div class="card flex justify-content-center">
        <Calendar
          dateFormat="dd/mm/yy"
          class="text-xs"
          v-model="date"
          :minDate="new Date()"
          showIcon
          :manualInput="false"
        />
      </div>
      <div class="flex gap-3 mt-7 justify-end">
        <button
          class="bg-red-500 text-white py-1 px-2 rounded-lg hover:opacity-80 text-sm"
          @click="visible = false"
        >
          Huỷ
        </button>
        <button
          class="bg-blue-500 text-sm text-white py-1 px-2 rounded-lg hover:opacity-80"
          @click="
            {
              handlePassConfirm(dataPassForm);
            }
          "
        >
          Xác nhận
        </button>
      </div>
    </Dialog>
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
import Toast from "primevue/toast";
import { ConvertErrorMessage } from "../../utils/importAllComponent";
import Dropdown from "primevue/dropdown";
import OverlayPanel from "primevue/overlaypanel";
import moment from "moment";
import { useStaffStore } from "../../stores/staffStore";
import { IconTrash, IconTruckDelivery } from "@tabler/icons-vue";
import { IconCheck } from "@tabler/icons-vue";
import Calendar from "primevue/calendar";

const orders = ref();
const visible = ref(false);
const dataPassForm = ref();
const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);
const staffStore = useStaffStore();
const date = ref(new Date());
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
  if (staffStore.getStaff()._id) {
    await handleGetOrderProducts();
  }
});

const totalPrice = (data: any) => {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += parseInt(item.GiaDatHang);
  }
  return totalPrice.toLocaleString("vi") + " VND";
};

const cancelOrder = async (id: string, TrangThai: string) => {
  loading.value = true;
  try {
    const dataPass = {
      id: id,
      TrangThai: TrangThai,
      MSNV: staffStore.getStaff()._id,
    };
    const res = await OrderService.UpdateOrder(dataPass);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Cập nhật đơn hàng",
        detail: res.message,
        life: 2000,
      });
      handleGetOrderProducts();
    }
    loading.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Cập nhật đơn hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

const confirmOrderApi = async (id: string, TrangThai: string, NgayGH: Date) => {
  loading.value = true;
  try {
    const dataPass = {
      id: id,
      TrangThai: TrangThai,
      MSNV: staffStore.getStaff()._id,
      NgayGH: NgayGH,
    };
    const res = await OrderService.ConfirmOrder(dataPass);
    if (res.statusCode === 0) {
      visible.value = false;
      toast.add({
        severity: "success",
        summary: "Xác nhận đơn hàng",
        detail: res.message,
        life: 2000,
      });
      handleGetOrderProducts();
    }
    loading.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Xác nhận đơn hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

const confirmCancelOrder = (id: string, message: string, TrangThai: string) => {
  confirm.require({
    message: `Bạn có chắc chắn ${message} này không?`,
    header: `Xác nhận ${message}`,
    icon: "pi pi-info-circle",
    rejectClass: "p-button-text p-button-text",
    acceptClass: "p-button-danger p-button-text",
    acceptLabel: "Có",
    rejectLabel: "Không",
    accept: () => {
      cancelOrder(id, TrangThai);
    },
  });
};

const handlePassDataUpdate = (
  data: HangHoaTS,
  message: string,
  status: string
) => {
  dataPassForm.value = data;
  confirmCancelOrder(dataPassForm.value._id, message, status);
};

const handlePassConfirm = (data: HangHoaTS) => {
  dataPassForm.value = data;
  confirmOrderApi(dataPassForm.value._id, "Đã xác nhận", date.value);
};

const handleGetOrderProducts = async () => {
  try {
    const res = await OrderService.GetAllOrderByStatus(
      selectedStatus.value.name
    );
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

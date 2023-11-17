<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-blue-500">
      Thống kê về tài khoản của bạn
    </h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        class="px-4 py-5 bg-white border border-l-8 border-l-blue-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          Số lần đặt hàng
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ dataStatistic.totalOrder }}
        </dd>
      </div>

      <div
        class="px-4 py-5 bg-white border border-l-8 border-l-green-600 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          Số đơn thành công
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ dataStatistic.totalSucessOrder }}
        </dd>
      </div>

      <div
        class="px-4 py-5 bg-white border border-l-8 border-l-teal-500 shadow overflow-hidden border-r rounded-r-lg sm:p-6"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          Số tiền đã chi (VND)
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ dataStatistic.totalPay.toLocaleString("vi") }}
        </dd>
      </div>
    </dl>
  </div>

  <div class="bg-white border mt-10 shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-blue-500">
            Thông tin cá nhân
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Bạn có thể chỉnh sửa thông tin cá nhân của mình
          </p>
        </div>

        <div class="flex gap-3">
          <button
            class="bg-blue-500 py-1 text-sm px-2 rounded-lg text-white hover:opacity-80"
            @click="visible = true"
          >
            Sửa
          </button>

          <button
            class="bg-blue-500 text-sm py-1 px-2 rounded-lg text-white hover:opacity-80"
            @click="visibleChangePassword = true"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Họ và tên</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.HoTenKH }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.email }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Địa chỉ</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.DiaChi }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Số điện thoại</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ userData.SoDienThoai }}
          </dd>
        </div>

        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Tham gia từ</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ moment(userData.createdAt).format("DD/MM/YYYY") }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
  <Toast></Toast>
  <Dialog
    v-model:visible="visible"
    modal
    header="Chỉnh sửa thông tin cá nhân"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form>
      <div class="flex gap-3">
        <div class="mt-4 w-1/2">
          <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="HoTenKH"
            >Họ và tên:
          </label>
          <input
            v-bind="HoTenKH"
            id="HoTenKH"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
          <span class="text-sm text-red-500 italic">{{ errors.HoTenKH }}</span>
        </div>

        <div class="mt-4 w-1/2">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="SoDienThoai"
              >Số điện thoại:</label
            >
          </div>

          <input
            v-bind="SoDienThoai"
            id="SoDienThoai"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="tel"
          />
          <span class="text-sm text-red-500 italic">{{
            errors.SoDienThoai
          }}</span>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="mt-4 w-1/2">
          <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="email"
            >Email:
          </label>
          <input
            id="email"
            v-bind="email"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
          <span class="text-sm text-red-500 italic">{{ errors.email }}</span>
        </div>

        <div class="mt-4 w-1/2">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="DiaChi"
              >Địa chỉ:</label
            >
          </div>

          <input
            id="DiaChi"
            v-bind="DiaChi"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
          <span class="text-sm text-red-500 italic">{{ errors.DiaChi }}</span>
        </div>
      </div>

      <div class="mt-6 flex gap-5">
        <button
          type="button"
          @click="visible = false"
          class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
          Huỷ
        </button>
        <button
          @click="onSubmit"
          type="button"
          class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
          Lưu
        </button>
      </div>
    </form>
  </Dialog>

  <Dialog
    v-model:visible="visibleChangePassword"
    modal
    header="Chỉnh sửa thông tin cá nhân"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form>
      <div class="flex gap-3">
        <div class="mt-4 w-1/2">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="password"
              >Mật khẩu cũ:</label
            >
          </div>

          <input
            id="password"
            v-model="oldPassword"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>

        <div class="mt-4 w-1/2">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="password"
              >Mật khẩu mới:</label
            >
          </div>

          <input
            id="password"
            v-model="password"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>
      </div>

      <div class="flex gap-3">
        <div class="mt-4 w-1/2">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="repassword"
              >Nhập lại mật khẩu:</label
            >
          </div>

          <input
            id="repassword"
            v-model="repassword"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>
      </div>

      <div class="mt-6 flex gap-5">
        <button
          type="button"
          @click="visibleChangePassword = false"
          class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
          Huỷ
        </button>
        <button
          type="button"
          @click="onSubmitChangePassword"
          class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
          Lưu
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { OrderService, UserService } from "../../services";
import { useUserStore } from "../../stores/userStore";
import moment from "moment";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ConvertErrorMessage } from "../../utils/importAllComponent";
import Dialog from "primevue/dialog";
import * as yup from "yup";
import { useForm } from "vee-validate";

const visible = ref(false);
const visibleChangePassword = ref(false);
const userStore = useUserStore();
const userData = userStore.getUser();
const toast = useToast();
const dataStatistic = ref({
  totalOrder: 0,
  totalSucessOrder: 0,
  totalPay: 0,
});
const { errors, defineInputBinds, handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Email không hợp lệ").required("Email trống"),
    HoTenKH: yup
      .string()
      .min(3, "Tên phải có ít nhất 3 ký tự")
      .required("Tên người dùng trống"),
    SoDienThoai: yup
      .string()
      .required("Số điện thoại trống")
      .matches(
        /((09|03|07|08|05)+([0-9]{8})\b)/g,
        "Số điện thoại không hợp lệ"
      ),
    DiaChi: yup
      .string()
      .required("Thiếu địa chỉ")
      .min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  }),
});

const email = defineInputBinds("email");
const SoDienThoai = defineInputBinds("SoDienThoai");
const DiaChi = defineInputBinds("DiaChi");
const HoTenKH = defineInputBinds("HoTenKH");

const password = ref();
const repassword = ref();
const oldPassword = ref();

onMounted(() => {
  if (userData._id) {
    getStatistic();
    setValues({
      HoTenKH: userData.HoTenKH,
      DiaChi: userData.DiaChi,
      SoDienThoai: userData.SoDienThoai,
      email: userData.email,
    });
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const dataPass = { ...values, id: userData._id };
    const res = await UserService.UpdateProfile(dataPass);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Cập nhật thông tin",
        detail: res.message,
        life: 2000,
      });
      visible.value = false;
      window.location.reload();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Cập nhật thông tin",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
});

const onSubmitChangePassword = async () => {
  try {
    if (password.value !== repassword.value) {
      return toast.add({
        severity: "warn",
        summary: "Đổi mật khẩu",
        detail:
          "Mật khẩu nhập lại không khớp với mật khẩu mới, vui lòng nhập lại",
        life: 2000,
      });
    }

    const dataPass = {
      id: userData._id,
      newPassword: password.value,
      oldPassword: oldPassword.value,
    };

    const res = await UserService.ChangePassword(dataPass);
    if (res.statusCode === 0) {
      toast.add({
        severity: "success",
        summary: "Đổi mật khẩu",
        detail: res.message,
        life: 2000,
      });
      visible.value = false;
      window.location.reload();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Đổi mật khẩu",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
};

async function getStatistic() {
  try {
    const res = await OrderService.UserStatistic(userData._id);
    if (res.statusCode === 0) {
      dataStatistic.value = res.data;
    }
  } catch (error) {
    console.log("error", error);
  }
}
</script>

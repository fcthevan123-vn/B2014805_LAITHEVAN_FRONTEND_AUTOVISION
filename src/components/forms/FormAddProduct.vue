<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-1 my-4 gap-6 sm:grid-cols-2">
      <div>
        <label class="font-medium text-gray-700 dark:text-gray-200" for="TenHH"
          >Tên sản phẩm</label
        >
        <input
          v-bind="TenHH"
          id="TenHH"
          placeholder="Tên của sản phẩm"
          type="TenHH"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.TenHH }}</span>
      </div>

      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="SoLuongHang"
          >Số lượng</label
        >
        <input
          v-bind="SoLuongHang"
          placeholder="Số lượng sản phẩm"
          id="SoLuongHang"
          type="number"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{
          errors.SoLuongHang
        }}</span>
      </div>

      <div>
        <label class="font-medium text-gray-700 dark:text-gray-200" for="Gia"
          >Giá (VND)</label
        >
        <input
          v-bind="Gia"
          placeholder="Giá tiền"
          id="Gia"
          type="number"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.Gia }}</span>
      </div>

      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="TrongLuong"
          >Trọng lượng (g)</label
        >
        <input
          v-bind="TrongLuong"
          id="TrongLuong"
          placeholder="Trọng lượng tương đối"
          type="number"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.TrongLuong }}</span>
      </div>

      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="CongNgheDem"
          >Công nghệ đệm</label
        >
        <input
          v-bind="CongNgheDem"
          id="CongNgheDem"
          placeholder="Công nghệ đệm"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{
          errors.CongNgheDem
        }}</span>
      </div>

      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="DeNgoai"
          >Đế ngoài</label
        >
        <input
          v-bind="DeNgoai"
          id="DeNgoai"
          placeholder="Đế của giày"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.DeNgoai }}</span>
      </div>

      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="ChatLieu"
          >Chất liệu</label
        >
        <input
          v-bind="ChatLieu"
          id="ChatLieu"
          placeholder="Chất liệu"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.ChatLieu }}</span>
      </div>
      <div>
        <label
          class="font-medium text-gray-700 dark:text-gray-200"
          for="PhuHopVoi"
          >Phù hợp với</label
        >
        <input
          v-bind="PhuHopVoi"
          id="PhuHopVoi"
          placeholder="Nam, nữ, trẻ em,..."
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.PhuHopVoi }}</span>
      </div>

      <div>
        <label class="font-medium text-gray-700 dark:text-gray-200" for="MoTaHH"
          >Mô tả</label
        >
        <textarea
          v-bind="MoTaHH"
          id="MoTaHH"
          placeholder="Mô tả về giày"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.MoTaHH }}</span>
      </div>

      <div>
        <label class="font-medium text-gray-700 dark:text-gray-200" for="GhiChu"
          >Ghi chú</label
        >
        <textarea
          v-bind="GhiChu"
          id="GhiChu"
          placeholder="Ghi chú về giày"
          type="text"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        <span class="text-sm text-red-500 italic">{{ errors.GhiChu }}</span>
      </div>

      <div class="relative flex items-start mb-4">
        <div class="flex flex-col justify-start items-start h-5">
          <div class="flex gap-2 font-medium">
            <Field name="NoiBat" type="checkbox" value="true" />
            <p>Đánh dấu là nổi bật</p>
          </div>

          <div class="ml-5 text-sm">
            <p id="NoiBat" class="text-gray-500">
              Sản phẩm sẽ được hiển thị ở trang chủ
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix mt-6">
      <label class="font-medium text-gray-700 dark:text-gray-200" for="GhiChu"
        >Hình ảnh</label
      >
      <UploadImage
        @imageChange="handleSetImage"
        @handleSetHinhHH="handleSetHinhHH"
        @handleSetHinhXoa="handleSetHinhXoa"
        :HinhHH="imageToChange"
      ></UploadImage>
      <span class="text-sm text-red-500 italic">{{ errors.HinhUpload }}</span>
    </div>

    <ProgressBar
      v-if="isLoading"
      class="my-4"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>

    <div class="flex justify-end mt-6">
      <Button
        v-if="isUpdateForm"
        type="submit"
        :loading="isLoading"
        class="py-1 px-3 rounded-xl"
        >Sửa</Button
      >
      <Button
        class="py-1 px-3 rounded-xl"
        v-else
        type="submit"
        :loading="isLoading"
        >Thêm</Button
      >
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useForm, Field } from "vee-validate";
import * as yup from "yup";
import { HangHoaTS, HinhHH } from "../../utils/allTypeTs";
import UploadImage from "./UploadImage.vue";
import { ProductService } from "../../services";
import { useToast } from "primevue/usetoast";
import ProgressBar from "primevue/progressBar";

const props = defineProps({
  isUpdate: { type: Boolean },
  data: { type: Object },
});

const emit = defineEmits(["closeModal", "handleGetAllProducts"]);

const toast = useToast();
const imageToChange = ref();
const errorUploadImage = ref();
const isUpdateForm = ref(props.isUpdate);

const isLoading = ref(false);

const {
  values,
  setValues,
  errors,
  defineInputBinds,
  handleSubmit,
  setFieldValue,
} = useForm<HangHoaTS>({
  validationSchema: yup.object({
    TenHH: yup.string().required("Tên hàng hóa trống"),
    MoTaHH: yup.string().required("Mô tả hàng hóa trống"),
    Gia: yup.number().required("Giá trống"),
    SoLuongHang: yup.number().required("Số lượng hàng trống"),
    TrongLuong: yup.number().required("Trọng lượng trống"),
    ChatLieu: yup.string().required("Chất liệu trống"),
    PhuHopVoi: yup.string().required("Phù hợp với trống"),
    CongNgheDem: yup.string().required("Công nghệ đệm trống"),
    DeNgoai: yup.string().required("Đế ngoài trống"),
    GhiChu: yup.string().required("Ghi chú trống"),
  }),
});

const TenHH = defineInputBinds("TenHH");
const MoTaHH = defineInputBinds("MoTaHH");
const Gia = defineInputBinds("Gia");
const SoLuongHang = defineInputBinds("SoLuongHang");
const TrongLuong = defineInputBinds("TrongLuong");
const ChatLieu = defineInputBinds("ChatLieu");
const PhuHopVoi = defineInputBinds("PhuHopVoi");
const CongNgheDem = defineInputBinds("CongNgheDem");
const DeNgoai = defineInputBinds("DeNgoai");
const GhiChu = defineInputBinds("GhiChu");
const HinhUpload = defineInputBinds("HinhUpload");
const HinhHH = defineInputBinds("HinhHH");
const HinhXoa = defineInputBinds("HinhXoa");
const NoiBat = defineInputBinds("NoiBat");

if (props.data && props.isUpdate) {
  setValues(props.data);
  imageToChange.value = props?.data?.HinhHH;
}

const handleSetImage = (files: File[]) => {
  setFieldValue("HinhUpload", files);
};

const handleSetHinhHH = (images: HinhHH[] | undefined) => {
  setFieldValue("HinhHH", images);
};

const handleSetHinhXoa = (imageName: string[]) => {
  setFieldValue("HinhXoa", imageName);
};

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log("values", values);
    isLoading.value = true;
    let res;

    if (isUpdateForm.value) {
      res = await ProductService.updateProduct(values, props?.data?._id);
    } else {
      res = await ProductService.createProduct(values);
    }
    if (res.statusCode === 0) {
      if (isUpdateForm.value) {
        toast.add({
          severity: "success",
          summary: "Cập nhật sản phẩm",
          detail: "Bạn đã cập nhật sản phẩm thành công",
          life: 2000,
        });
      } else {
        toast.add({
          severity: "success",
          summary: "Tạo sản phẩm",
          detail: "Bạn đã tạo sản phẩm thành công",
          life: 2000,
        });
      }

      location.reload();
      // emit("handleGetAllProducts");

      emit("closeModal");
      isLoading.value = false;
    }
  } catch (error) {
    const err = error as Error;

    console.log("error", err.message);
  }
});
</script>

<style scoped>
.p-fileupload-custom {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

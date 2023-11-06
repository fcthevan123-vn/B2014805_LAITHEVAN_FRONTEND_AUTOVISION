<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-1 my-4 gap-6 sm:grid-cols-2">
      <div>
        <label class="text-gray-700 dark:text-gray-200" for="TenHH"
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
        <label class="text-gray-700 dark:text-gray-200" for="SoLuongHang"
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
        <label class="text-gray-700 dark:text-gray-200" for="Gia"
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
        <label class="text-gray-700 dark:text-gray-200" for="TrongLuong"
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
        <label class="text-gray-700 dark:text-gray-200" for="CongNgheDem"
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
        <label class="text-gray-700 dark:text-gray-200" for="DeNgoai"
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
        <label class="text-gray-700 dark:text-gray-200" for="ChatLieu"
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
        <label class="text-gray-700 dark:text-gray-200" for="PhuHopVoi"
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
        <label class="text-gray-700 dark:text-gray-200" for="MoTaHH"
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
        <label class="text-gray-700 dark:text-gray-200" for="GhiChu"
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
    </div>

    <div class="clearfix mt-6">
      <label class="text-gray-700 dark:text-gray-200" for="GhiChu"
        >Hình ảnh</label
      >
      <UploadImage @imageChange="handleSetImage"></UploadImage>
      <span class="text-sm text-red-500 italic">{{ errors.HinhUpload }}</span>
    </div>

    <div class="flex justify-end mt-6">
      <Button type="submit"> Thêm </Button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import UploadImage from "./UploadImage.vue";

const { values, errors, defineInputBinds, handleSubmit, setFieldValue } =
  useForm({
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
      HinhHH: yup.array().min(4, "Ít nhất 4 hình phải được cung cấp"),
      HinhUpload: yup
        .array()
        .min(3, "Ít nhất phải có 3 hình")
        .max(5, "Tối đa 5 hình"),
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
// const HinhHH = defineInputBinds("HinhHH");
const HinhUpload = defineInputBinds("HinhUpload");

const handleSetImage = (files: File) => {
  setFieldValue("HinhUpload", files);
};

watch(values, () => {
  console.log("value: ", values);
});

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log("value: ", values);
  } catch (error) {
    const err = error as Error;
    alert(err.message);
    console.log("error", err.message);
  }
});

const fileImage = ref([]);

// const uploadImage = async (file) => {
//   const fmData = new FormData();

//   fmData.append("file", file);

//   try {
//     const res = await axios.post(
//       "https://api.cloudinary.com/v1_1/dvvg4xwoy/image/upload?upload_preset=swgjac1j",
//       fmData,
//       { headers: { "content-type": "multipart/form-data" } }
//     );

//     const imageUrl = res.data.secure_url;
//     console.log("imageUrl", imageUrl);
//   } catch (err) {
//     console.log("Eroor: ", err);
//   }
// };
</script>

<template>
  <div class="card">
    <!-- @remove="imageChangeEvent($event.files)"
      @select="imageChangeEvent($event.files)"
      @clear="imageChangeEvent([])" -->
    <Toast />
    <FileUpload
      name="images"
      :fileLimit="5"
      invalidFileLimitMessage="Tối đa chỉ 5 hình, vui lòng xoá bớt hình."
      url="http://127.0.0.1:5173/api/v1/product/create"
      accept="image/*"
      @select="onSelectedFiles"
      :showUploadButton="false"
      :multiple="true"
      :maxFileSize="1000000"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div
          class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
        >
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
            ></Button>

            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
        </div>
      </template>

      <template #empty>
        <p>Thêm hình ảnh cho sản phẩm</p>
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <div
          v-for="(file, index) of files"
          class="p-fileupload-file p-fileupload-custom"
        >
          <img
            role="presentation"
            class="p-fileupload-file-thumbnail"
            alt="branislav-belko-lJ7iAZxplpc-unsplash.jpg"
            :src="file.objectURL"
            width="50"
            data-pc-section="thumbnail"
          />
          <div class="p-fileupload-file-details" data-pc-section="details">
            <div class="p-fileupload-file-name" data-pc-section="filename">
              {{ file.name }}
            </div>

            <span
              class="p-badge p-component rounded-md p-badge-warning p-fileupload-file-badge p-1"
              data-pc-name="badge"
              data-pc-section="root"
              >Pending</span
            >
          </div>

          <div class="p-fileupload-file-actions" data-pc-section="actions">
            <Button
              icon="pi pi-times"
              @click="
                onRemoveTemplatingFile(file, removeFileCallback, index, files)
              "
              outlined
              rounded
              severity="danger"
            />
          </div>
        </div>

        <div
          v-for="(image, index) in imageExisted"
          class="p-fileupload-file p-fileupload-custom"
        >
          <img
            role="presentation"
            class="p-fileupload-file-thumbnail"
            alt="branislav-belko-lJ7iAZxplpc-unsplash.jpg"
            :src="image.UrlHinh"
            width="50"
            data-pc-section="thumbnail"
          />
          <div class="p-fileupload-file-details" data-pc-section="details">
            <div class="p-fileupload-file-name" data-pc-section="filename">
              {{ image.TenHinh }}
            </div>

            <span
              class="p-badge p-component rounded-md p-badge-info p-fileupload-file-badge p-1"
              data-pc-name="badge"
              data-pc-section="root"
              >Hình của sản phẩm</span
            >
          </div>

          <div class="p-fileupload-file-actions" data-pc-section="actions">
            <Button
              @click="removeExistData(index, image)"
              icon="pi pi-times"
              severity="danger"
              text
              rounded
              aria-label="Cancel"
            />
          </div>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import FileUpload from "primevue/fileupload";
import { defineEmits, ref } from "vue";
import { HinhHH } from "../../utils/allTypeTs";
const props = defineProps<{
  HinhHH: HinhHH[] | undefined;
}>();

const files = ref([] as File[]);
const imageExisted = ref(props.HinhHH);
const imageToDelele = ref([]);

const emit = defineEmits([
  "imageChange",
  "handleSetHinhHH",
  "handleSetHinhXoa",
]);

const imageChangeEvent = (files: File[]) => {
  emit("imageChange", files);
};

const handleSetHinhHHEvent = (Hinh: HinhHH[]) => {
  emit("handleSetHinhHH", Hinh);
};

const handleSetHinhXoaEvent = (HinhXoa: string[]) => {
  emit("handleSetHinhXoa", HinhXoa);
};

const onRemoveTemplatingFile = (
  file: any,
  removeFileCallback: (arg0: any) => void,
  index: any,
  files: File[]
) => {
  removeFileCallback(index);
  imageChangeEvent(files);
};

const removeExistData = (index: number, image: HinhHH) => {
  const newImage: HinhHH[] =
    imageExisted.value && imageExisted.value.filter((image, i) => i !== index);
  imageExisted.value = newImage;
  handleSetHinhHHEvent(newImage);
  imageToDelele.value.push(image._id as never);
  handleSetHinhXoaEvent(imageToDelele.value);
  console.log("imageToDelele.value", imageToDelele.value);
};

// const onClearTemplatingUpload = (clear: () => void) => {
//   clear();
// };

const onSelectedFiles = (event: { files: File[] }) => {
  files.value = event.files;
  imageChangeEvent(event.files);
};
</script>

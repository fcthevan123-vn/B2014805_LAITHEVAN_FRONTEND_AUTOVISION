<template>
  <div class="card">
    <Toast />
    <FileUpload
      name="images"
      :fileLimit="5"
      invalidFileLimitMessage="Tối đa chỉ 5 hình, vui lòng xoá bớt hình."
      url="http://127.0.0.1:5173/api/v1/product/create"
      @remove="imageChangeEvent($event.files)"
      @select="imageChangeEvent($event.files)"
      @clear="imageChangeEvent([])"
      accept="image/*"
      :showUploadButton="false"
      :multiple="true"
      :maxFileSize="1000000"
    >
      <template #empty>
        <p>Thêm hình ảnh cho sản phẩm</p>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import FileUpload from "primevue/fileupload";
import { defineEmits } from "vue";

const emit = defineEmits(["imageChange"]);

const imageChangeEvent = (files: File[]) => {
  emit("imageChange", files);
};
</script>

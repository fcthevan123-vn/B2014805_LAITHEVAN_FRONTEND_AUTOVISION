<template>
  <div class="flex-shrink-0">
    <img
      :src="
        props.data.MSHH.HinhHH && props.data.MSHH.HinhHH[0].UrlHinh
          ? props.data.MSHH.HinhHH[0].UrlHinh
          : ''
      "
      alt="error"
      class="rounded-md object-center object-cover w-24 h-24"
      :class="{
        'w-24 h-24': isSmall,
        'w-32 h-32': !isSmall,
      }"
    />
  </div>

  <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
      <div>
        <div class="flex justify-between">
          <h3 class="text-sm">
            <a class="font-medium text-gray-700 hover:text-gray-800">
              {{ props.data?.MSHH.TenHH }}
            </a>
          </h3>
        </div>
        <div class="mt-1 flex text-sm">
          <p class="text-gray-500">
            {{ props.data?.MauSac }}
          </p>
          <p class="ml-4 pl-4 border-l border-gray-300 text-gray-500">
            {{ props.data?.Size }}
          </p>
        </div>
        <p class="text-gray-500 text-sm">Số lượng {{ props.data?.SoLuong }}</p>
        <p v-if="!isSmall" class="text-gray-500 text-sm">
          Có {{ props.data?.MSHH.SoLuongHang }} sản phẩm
        </p>
        <p class="mt-1 text-sm font-medium text-gray-900">
          {{ priceProduct }}
          VND
        </p>
      </div>

      <div v-if="!isSmall" class="flex flex-col mt-4 sm:mt-0 sm:pr-9">
        <div class="flex justify-center items-center">
          <label for="Quantity" class="sr-only"> Quantity </label>

          <div class="flex items-center border border-gray-300 rounded-xl">
            <button
              @click="handleDecreaseQuantity"
              type="button"
              class="w-10 h-9 leading-6 text-gray-600 transition hover:opacity-75"
            >
              &minus;
            </button>

            <input
              v-model="quantity"
              type="number"
              readonly
              id="Quantity"
              class="h-9 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              @click="handleIncreaseQuantity"
              type="button"
              class="w-10 h-9 leading-6 text-gray-900 transition hover:opacity-60"
            >
              &plus;
            </button>
          </div>
        </div>

        <div class="absolute -top-1 right-0">
          <Button
            icon="pi pi-times"
            severity="danger"
            text
            @click="deleteCart()"
            size="small"
            rounded
            aria-label="Cancel"
          />
        </div>
      </div>
    </div>
  </div>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { CartTS } from "../../utils/allTypeTs";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import CartService from "../../services/cartService";
import { ConvertErrorMessage } from "../../utils/importAllComponent";
const toast = useToast();

const props = defineProps<{
  data: CartTS;
  isSmall: boolean;
}>();

const isSmall = ref(props.isSmall);
const priceProduct = computed(() => {
  const price = parseInt(props.data.SoLuong) * props.data.MSHH.Gia;
  return price.toLocaleString("vi");
});

const quantity = ref(parseInt(props.data.SoLuong));

const emit = defineEmits(["handleGetCart"]);

const handleIncreaseQuantity = () => {
  if (quantity.value === 10) {
    return toast.add({
      severity: "warn",
      summary: "Quá số lượng",
      detail: "Tối đa là 10",
      life: 2000,
    });
  }
  if (quantity.value == props.data.MSHH.SoLuongHang) {
    return toast.add({
      severity: "warn",
      summary: "Quá số lượng",
      detail: `Sản phẩm này chỉ có ${props.data.MSHH.SoLuongHang} sản phẩm`,
      life: 2000,
    });
  }
  quantity.value++;
  updateCart();
};

const handleDecreaseQuantity = () => {
  if (quantity.value === 1) {
    return toast.add({
      severity: "warn",
      summary: "Lỗi số lượng",
      detail: "Tối thiểu phải là 1",
      life: 2000,
    });
  }
  quantity.value--;
  updateCart();
};

async function updateCart() {
  try {
    const dataPass = {
      cartId: props.data._id,
      MSHH: props.data.MSHH._id,
      SoLuong: quantity.value,
    };

    const res = await CartService.UpdateCart(dataPass);
    if (res.statusCode === 0) {
      emit("handleGetCart");
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Cập nhật giỏ hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
}

async function deleteCart() {
  try {
    const res = await CartService.RemoveFromcart(props.data._id as string);
    if (res.statusCode === 0) {
      emit("handleGetCart");
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Xoá giỏ hàng",
      detail: ConvertErrorMessage(error as Error),
      life: 2000,
    });
  }
}
</script>

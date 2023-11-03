<script setup lang="ts">
import { PropType, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  message: { type: String, required: true },
  color: { type: String, required: true },
  title: { type: String, required: true },
  isOpenModal: { type: Boolean, required: true },
  toggleModal: Function as PropType<(close: boolean) => void>,
  onConFirm: Function,
});

function closeModal() {
  if (props.toggleModal) {
    props.toggleModal(false);
  }
}

function handleConfirm() {
  if (props.onConFirm) {
    props.onConFirm();
    closeModal();
    return true;
  }
  closeModal();
  return false;
}

const colorVariants = {
  blue: "bg-blue-100 text-blue-500 focus-visible:ring-blue-500 hover:bg-blue-200",
  red: "bg-red-100 text-red-500 focus-visible:ring-red-500 hover:bg-red-200",
  orange:
    "bg-orange-100 text-orange-500 focus-visible:ring-orange-500 hover:bg-orange-200",
};

type ColorVariantKey = "blue" | "red" | "orange";

let colorClass = ref("");
if (colorVariants.hasOwnProperty(props.color as ColorVariantKey)) {
  colorClass.value = colorVariants[props.color as ColorVariantKey];
}
</script>

<template>
  <TransitionRoot appear :show="props.isOpenModal" as="template">
    <Dialog as="div" @close="toggleModal" class="relative z-30">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                :class="[
                  'text-lg font-medium leading-6',
                  `text-${props.color}-500`,
                ]"
              >
                {{ props.title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-gray-500 text-md">
                  {{ message }}
                </p>
              </div>

              <div class="flex gap-3 mt-4">
                <button
                  type="button"
                  :class="[
                    `${colorClass}`,
                    'inline-flex justify-center rounded-xl border border-transparent  px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2',
                  ]"
                  @click="handleConfirm"
                >
                  Đồng ý
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Huỷ
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

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
const btnClass = ref(
  `inline-flex justify-center rounded-xl border border-transparent bg-${props.color}-100 px-4 py-2 text-sm font-medium text-${props.color}-500 hover:bg-${props.color}-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-${props.color}-500 focus-visible:ring-offset-2`
);
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
          class="flex min-h-full items-center justify-center p-4 text-center"
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
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
                <p class="text-md text-gray-500">
                  {{ message }}
                </p>
              </div>

              <div class="mt-4 flex gap-3">
                <button type="button" :class="btnClass" @click="handleConfirm">
                  Đồng ý
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-xl border bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

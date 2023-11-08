<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  IconHome,
  IconUsersGroup,
  IconMenu,
  IconX,
  IconShoe,
  IconSearch,
} from "@tabler/icons-vue";
import { useStaffStore } from "../stores/staffStore";
import { AuthService } from "../services";
import router from "../router";
import { LoadingPage } from "../views";

const navigation = [
  { name: "Trang chủ", href: "#", icon: IconHome, current: true },
  { name: "Tất cả giày", href: "#", icon: IconShoe, current: false },
  {
    name: "Quản lý tài khoản",
    href: "#",
    icon: IconUsersGroup,
    current: false,
  },
  { name: "Khác", href: "#", icon: IconSearch, current: false },
];

const sidebarOpen = ref(false);

const staffStore = useStaffStore();

const isLoading = ref(false);

const staffData = ref(staffStore.getStaff());

onMounted(async () => {
  await handleGetProfile();
});

async function handleGetProfile() {
  try {
    isLoading.value = true;
    const res = await AuthService.getProfileAdmin();
    if (res.statusCode === 0) {
      const staffDataRes = res.data;
      staffData.value = staffDataRes;
      staffStore.setStaff(staffDataRes);
    } else {
      router.push("/admin/login");
    }
    isLoading.value = false;
  } catch (error) {
    router.push("/admin/login");
    isLoading.value = false;
    const err = error as Error;
    throw err;
  }
}

const handleLogout = async () => {
  try {
    const res = await AuthService.logout();
    if (res.statusCode === 0) {
      staffStore.logout();
    }
  } catch (error) {
    throw error;
  }
};
</script>

<template>
  <div v-if="isLoading">
    <LoadingPage></LoadingPage>
  </div>
  <div v-else class="h-screen flex">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <IconX class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <RouterLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-4 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </RouterLink>
                </div>
              </nav>
            </div>
            <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ staffData.HoTenNV }}
                    </p>
                    <button
                      @click="handleLogout"
                      class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      View profile
                    </button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100"
        >
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center justify-center flex-shrink-0 px-4">
              <a
                class="text-xl lg:inline-block py-2 text-blue-500 font-bold underline underline-offset-4"
                href="/"
                >AutoVision
              </a>
            </div>
            <nav class="mt-5 flex-1" aria-label="Sidebar">
              <div class="px-2 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" class="flex-shrink-0 w-full group block">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-md font-bold text-gray-700 group-hover:text-gray-900"
                  >
                    {{ staffData.HoTenNV }}
                  </p>
                  <p
                    @click="handleLogout"
                    class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    Đăng xuất
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
        >
          <div>
            <a
              class="text-xl lg:inline-block py-2 text-blue-500 font-bold underline underline-offset-4"
              href="/"
              >AutoVision
            </a>
          </div>
          <div>
            <button
              type="button"
              class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <IconMenu class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
        >
          <!-- Start main area-->
          <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <!-- Children -->
            <RouterView />
          </div>
          <!-- End main area -->
        </main>
      </div>
    </div>
  </div>
</template>

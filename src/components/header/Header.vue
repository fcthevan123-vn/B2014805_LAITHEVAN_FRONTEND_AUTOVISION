<script setup lang="ts">
import ConfirmModal from "../modals/ConfirmModal.vue";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { AuthService } from "../../services";
const userStore = useUserStore();
const userData = ref(userStore.getUser());
const isLoggedIn = ref(userStore.getStateLogin());

onBeforeRouteUpdate(() => {
  userData.value = userStore.getUser();
  isLoggedIn.value = userStore.getStateLogin();
});

const openModal = ref(false);

function ToggleModal() {
  openModal.value = !openModal.value;
}

async function handleLogout() {
  try {
    const res = await AuthService.logout();
    if (res.statusCode === 0) {
      isLoggedIn.value = false;
      userStore.logout();
    }
  } catch (error) {
    throw error;
  }
}
</script>

<template>
  <ConfirmModal
    message="Bạn có chắc chắn muốn đăng xuất không?"
    color="red"
    title="Đăng xuất"
    :isOpenModal="openModal"
    :toggleModal="ToggleModal"
    :onConFirm="handleLogout"
  ></ConfirmModal>
  <Disclosure
    as="nav"
    class="bg-white shadow sticky top-0 z-10"
    v-slot="{ open }"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <a
              class="text-lg lg:inline-block py-2 text-blue-500 font-bold"
              href="/"
              >AutoVision
            </a>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              href="#"
              class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Trang chủ
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Sản phẩm
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Giới thiệu
            </a>
          </div>
        </div>

        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            v-if="isLoggedIn"
            type="button"
            style="height: 38px"
            class="bg-white py-1 px-2 rounded-xl text-gray-700 border border-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="sr-only">View cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-garden-cart"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"
              ></path>
              <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055"></path>
              <path
                d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323"
              ></path>
            </svg>
          </button>
          <div v-else class="flex gap-2">
            <RouterLink to="/login">
              <button
                class="px-4 py-2 font-medium text-sm tracking-wide text-dark transition-colors duration-300 transform bg-white border border-gray-300 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                Đăng nhập
              </button>
            </RouterLink>

            <RouterLink to="/login">
              <button
                class="px-4 py-2 font-medium text-sm tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Đăng ký
              </button>
            </RouterLink>
          </div>
          <!-- Profile dropdown -->
          <Menu v-if="isLoggedIn" as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none"
              >
                <span class="sr-only">Open user menu</span>
                <button
                  class="flex gap-1 px-4 py-2 font-medium capitalize text-sm tracking-wide text-dark transition-colors duration-300 transform bg-white border border-gray-300 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  </svg>
                  {{ userData.fullName }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-arrow-narrow-down"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M16 15l-4 4"></path>
                    <path d="M8 15l4 4"></path>
                  </svg>
                </button>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-blue-500 font-semibold',
                    ]"
                    >{{ userData.email }}</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Trang cá nhân</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Cài đặt</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    @click="ToggleModal"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm  text-red-500',
                    ]"
                    >Đăng xuất</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <!-- <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" /> -->
            <svg
              v-if="!open"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-menu-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 6l16 0"></path>
              <path d="M4 12l16 0"></path>
              <path d="M4 18l16 0"></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          as="a"
          href="#"
          class="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >Dashboard</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >Team</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >Projects</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >Calendar</DisclosureButton
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="">
            <div class="text-base font-medium text-gray-800">
              {{ userData.fullName }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ userData.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >Trang cá nhân</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >Cài đặt</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-red-500 hover:text-gray-800 hover:bg-gray-100"
            >Đăng xuất</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/header/Header.vue";
import Footer from "../components/sections/Footer.vue";
import { useUserStore } from "../stores/userStore";
import { AuthService } from "../services";
import router from "../router";
import { LoadingPage } from "../views";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const userStore = useUserStore();
const isLoading = ref(false);
const toast = useToast();

onMounted(async () => {
  await handleGetProfile();
});

async function handleGetProfile() {
  try {
    isLoading.value = true;
    const res = await AuthService.getProfile();
    if (res.statusCode === 0) {
      if (res.data.BiKhoa === true) {
        isLoading.value = false;
        toast.add({
          severity: "error",
          summary: "Tài khoản của bạn đã bị khoá",
          detail: "Hãy liên hệ với chúng tôi để biết thêm chi tiết.",
          life: 10000,
        });
        handleLogout();
        return true;
      }
      const userData = res.data;
      userStore.setUser(userData);
      userStore.setIsLogin(true);
    } else {
      router.push("/login");
    }
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    const err = error as Error;
    throw err;
  }
}

const handleLogout = async () => {
  try {
    const res = await AuthService.logout();
    if (res.statusCode === 0) {
      userStore.logout();
    }
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <Toast></Toast>
  <div v-if="isLoading">
    <LoadingPage></LoadingPage>
  </div>
  <div v-else>
    <Header />

    <div class="w-full flex items-center flex-col">
      <div class="container">
        <RouterView />
      </div>
    </div>
    <Footer />
  </div>
</template>

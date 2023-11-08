<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/header/Header.vue";
import Footer from "../components/sections/Footer.vue";
import { useUserStore } from "../stores/userStore";
import { AuthService } from "../services";
import router from "../router";
import { LoadingPage } from "../views";

const userStore = useUserStore();
const isLoading = ref(false);
onMounted(async () => {
  await handleGetProfile();
});

async function handleGetProfile() {
  try {
    isLoading.value = true;
    const res = await AuthService.getProfile();
    if (res.statusCode === 0) {
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
</script>
<template>
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

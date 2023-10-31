<script setup lang="ts">
import Header from "../components/header/Header.vue";
import Footer from "../components/sections/Footer.vue";
</script>
<template>
  <Header />

  <div class="w-full flex items-center flex-col">
    <div class="container">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="body">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped>
.body {
  box-sizing: border-box;
  padding: 32px 64px;
  width: 100%;
}
</style>

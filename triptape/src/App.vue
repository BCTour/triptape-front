<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>

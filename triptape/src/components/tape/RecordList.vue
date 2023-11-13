<script setup>
import { ref } from 'vue';
import Record from "@/components/tape/Record.vue";

defineProps({

})
</script>

<template>
  <div class="record-list">
    <Record/>
    <Record/>
    <Record/>
    <Record/>
  </div>
</template>

<style scoped>
.record-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
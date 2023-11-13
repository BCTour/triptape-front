<script setup>
import { ref } from 'vue';
defineProps({
  recordKey: Number,
  createtime: String,
  content: String,
  img: String,
  attractionKey: Number,
  userKey: Number,
  parentRecordKey: Number,
})

</script>

<template>
  <div class="card reactive">
    <p class="key">#{{ recordKey }}</p>
    <p>{{content}}</p>
  </div>
</template>

<style scoped>
.key {
  margin-bottom: 16px;
}
.card {
  padding: 24px;
  margin-bottom: 12px;
}
</style>
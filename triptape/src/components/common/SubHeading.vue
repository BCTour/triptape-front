<script setup>
defineProps({
  title: String,
  description: String,
})
</script>

<template>
  <div class="sub-heading">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.sub-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
}

p {
  margin-left: 16px;
}
</style>
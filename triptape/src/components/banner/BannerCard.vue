<script setup>

const props = defineProps({
  tape: Object,
  title: String,
  description: String,
  imgSrc: String,
})

const src = "https://images.dog.ceo/breeds/terrier-australian/n02096294_7317.jpg";
</script>

<template>
  <div class="card" :style="{'background-image': `url(${imgSrc})`}">
    <h1 class="text">{{ title }}</h1>
    <p class="text">{{ description }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 400px;
  padding: 32px;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  background-repeat : no-repeat;
  background-size : cover;
}
.text {
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}
</style>
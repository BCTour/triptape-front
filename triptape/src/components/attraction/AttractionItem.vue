<script setup>
defineProps({
  type_code: Number,
  name: String,
  description: String,
  address: String,
  img: String,
})
</script>

<template>
  <div class="card reactive">
    <img src="https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_3672.jpg"/>
    <div class="content">
      <h3>장소 이름</h3>
      <p class="category">{{type_code}}</p>
      <p class="description">{{description}}</p>
      <p class="address">{{address}}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 8px;
  margin-bottom: 12px;
  height: 100px;
  flex-direction: row;
}

img {
  height: 100%;
  width: 150px;
  object-fit: cover;
  border-radius: 12px;
}
.category {
  color: var(--caption-color);
  font-size: small;
}

.description {
  font-size: medium;
}

.address {
  color: var(--caption-color);
  font-size: small;
}

.content {
  padding: 8px;
}
</style>
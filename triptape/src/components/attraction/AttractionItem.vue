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
    <img v-if="!img.saveFile" src="../../assets/img/no_image.png">
    <img v-else :src="img.saveFile"/>
    <div class="content">
      <h3>{{name}}</h3>
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
  min-width: 150px;
  object-fit: cover;
  border-radius: 12px;
}
.category {
  color: var(--caption-color);
  font-size: small;
}

.description {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
	line-height: 140%;
  font-size: smaller;
  margin-bottom: 8px;
}
.address {
  color: var(--caption-color);
  font-size: small;
}

.content {
  padding: 0px 8px;
}
</style>
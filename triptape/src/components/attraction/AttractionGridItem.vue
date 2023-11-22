<script setup>
defineProps({
  name: String,
  attractionKey: Number,
  description: String,
  address: String,
  img: Object,
  popular: Number
})


</script>

<template>
  <div class="card reactive">

    <img v-if="img && img.saveFile" :src="img.saveFile">
    <img v-else src="@/assets/img/no_image.png">
    <div class="content">
      <h3>{{ name }}</h3>

      <div class="description">
        {{ description }}
      </div>
      <p class="caption">{{ address }}</p>
      <div class="caption" style="margin-top:5px">♥ {{ popular }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: calc(25% - 48px);
  /* width: 22.5%; */
  height: 330px;
  margin: 16px 32px 16px 0px;
  padding: 8px;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 140%;
}

img {
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 12px 12px;
  margin-bottom: 16px;

}

.content {
  padding: 8px;
}

.text-box {
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 140%;
  color: var(--caption-color);
  font-size: smaller;
}
</style>
<script setup>
defineProps({
  title: String,
  tapeKey: Number,
  description: String,
  img: String,
})
</script>

<template>
  <div class="card reactive">
		<img v-if="img" :src="img">
    <img v-else src="@/assets/img/no_image.png">
		<div class="content">
			<h3>{{ title }}</h3>
			<div class="text-box">
				{{ description }}
			</div>
		</div>
  </div>
</template>

<style scoped>
.card {
  width: calc(25% - 48px);
	/* width: 22.5%; */
	height: 320px;
  margin: 16px 32px 16px 0px;
  padding: 8px;
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
<script setup>

defineProps({
  title: String,
  tapeKey: Number,
  description: String,
  img: Object,
  joinNum: Number,
  viewNum: Number,
  popular: Number,
  user: {
    userId: String,
    userName: String,
  }
})
</script>

<template>
  <div class="card reactive">
    <img v-if="img" :src="img.saveFile">
    <img v-else src="@/assets/img/no_image.png">
    <div class="content">
      <h3>{{ title }}</h3>
      <div class="text-box">
        {{ description }}
      </div>
      <div class="caption">♥ {{ popular }} | 조회수 {{ viewNum }} | 레코드 {{ joinNum }}개</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 1;
  min-width: 300px;
  height: 320px;
  margin: 16px;
  padding: 8px;
}

img {
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 12px 12px;
  margin-bottom: 8px;

}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 8px;
}

.text-box {
  width: 100%;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 140%;
  color: var(--caption-color);
  font-size: smaller;
}
</style>
<script setup>

import { ref, onMounted } from "vue";
import { isLikeAttraction, checkLikeAttraction, uncheckLikeAttraction } from "@/util/like.js"
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from 'pinia';
import LikeIcon from "@/assets/icons/LikeIcon.vue";

const auth = useAuthStore();
const { isLogined } = storeToRefs(auth);

const props = defineProps({
  attractionKey: Number,
  name: String,
  description: String,
  address: String,
  img: String,
  popular: Number
})

const isLike = ref(true);
const popularNum = ref(props.popular);

const onClickLike = async () => {
  if (isLike.value) { // 좋아요 -> 싫어요
    const result = await uncheckLikeAttraction(props.attractionKey);
    isLike.value = result ? false : true;
    popularNum.value -= 1;
  } else { // 싫어요 -> 좋아요
    const result = await checkLikeAttraction(props.attractionKey);
    isLike.value = result ? true : false;
    popularNum.value += 1;
  }
}

onMounted(async () => {
  if (isLogined.value) isLike.value = await isLikeAttraction(props.attractionKey);
})
</script>

<template>
  <div class="card reactive">
    <img v-if="!img || !img.saveFile" src="../../assets/img/no_image.png">
    <img v-else :src="img.saveFile" />
    <div class="content">
      <div class="row">
        <h3>{{ name }}</h3>
        <div style="display: flex;">
          <LikeIcon v-if="isLogined" @click.stop="onClickLike" class="icon"
            :class="{ 'like-btn-unselected': !isLike, 'like-btn-selected': isLike }" />
          <p class="popular">{{ popularNum }}</p>
        </div>
      </div>
      <p class="description">{{ description }}</p>
      <p class="address">{{ address }}</p>
    </div>

  </div>
</template>

<style scoped>
.icon {
  width: 18px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

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
  flex: 1;
}

.popular {
  line-height: 220%;
  color: var(--caption-color);
  font-size: smaller;
}
</style>
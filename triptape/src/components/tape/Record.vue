<script setup>

import LikeIcon from "@/assets/icons/LikeIcon.vue";

import { ref, onMounted } from 'vue';
import { isLikeRecord, uncheckLikeRecord, checkLikeRecord } from '@/util/like';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();
const { isLogined } = storeToRefs(auth);
const props = defineProps({
  tapeKey: Number,
  recordKey: Number,
  createtime: String,
  content: String,
  img: Object,
  attractionKey: Number,
  user: Object,
  attraction: Object,
  parentRecordKey: Number,
})

const isLikeCurRecord = ref(false);

onMounted(async () => {
  if (isLogined.value) isLikeCurRecord.value = await isLikeRecord(props.tapeKey, props.recordKey);
})

const onClickLike = async () => {
  if (isLikeCurRecord.value){ // 좋아요 -> 안 좋아요
    const result = await uncheckLikeRecord(props.tapeKey, props.recordKey);
    isLikeCurRecord.value = result ? false : true; 
  } else {
    const result = await checkLikeRecord(props.tapeKey, props.recordKey);
    isLikeCurRecord.value = result ? true : false;
  }
}

</script>

<template>
  <div class="card reactive record-container">
    <p class="caption">#{{ recordKey }}  <span v-if="parentRecordKey">/ <span class="parent-num">#{{ parentRecordKey }}</span>에 대한 답글</span></p>
    <p class="content">{{content}}</p>
    <img v-if="img" :src="img.saveFile">
    <div class="card reactive attraction-container" v-if="attraction" @click.stop="$router.push({name: 'attractionDetail', params: {id: attraction.attractionKey}})">
      <h4>{{attraction.name }}</h4>
      <p class="caption">{{ attraction.address }}</p>
    </div>
    <div class="caption-container">
      <p class="caption">@{{ user.userId }} | {{createtime}} </p>
      <LikeIcon
        class="icon" :class="{'like-btn-unselected': !isLikeCurRecord, 'like-btn-selected': isLikeCurRecord}"
        @click.stop="onClickLike"
      />
    </div>
  </div>
</template>

<style scoped>
.icon {
  width: 18px;
}
.key {
  margin-bottom: 16px;
}
.content{
  margin: 4px 0px 16px 0px;
}
.parent-num{
  color: rgb(36, 140, 226)
}
.record-container {
  padding: 24px;
  margin-bottom: 12px;
}
.attraction-container{
  padding: 16px;
  margin-bottom: 8px;
}
.caption-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
img {
  /* max-height: 150px; */
  /* max-width: 100%; */
  height: auto;
  width: auto;
}
</style>
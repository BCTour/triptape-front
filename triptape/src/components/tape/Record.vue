<script setup>

import LikeIcon from "@/assets/icons/LikeIcon.vue";
import CloseIcon from '@/assets/icons/CloseIcon.vue';

import { ref, onMounted } from 'vue';
import { isLikeRecord, uncheckLikeRecord, checkLikeRecord } from '@/util/like';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';
import { connect } from "@/util/access.js";
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
  likeNum: Number,
})

const isLikeCurRecord = ref(false);
const curLikeNum = ref(0);

onMounted(async () => {
  if (isLogined.value) isLikeCurRecord.value = await isLikeRecord(props.tapeKey, props.recordKey);
  curLikeNum.value = props.likeNum;
})

const onClickLike = async () => {
  if (isLikeCurRecord.value){ // 좋아요 -> 안 좋아요
    const result = await uncheckLikeRecord(props.tapeKey, props.recordKey);
    isLikeCurRecord.value = result ? false : true; 
    curLikeNum.value--;
  } else {
    const result = await checkLikeRecord(props.tapeKey, props.recordKey);
    isLikeCurRecord.value = result ? true : false;
    curLikeNum.value++;
  }
}

const emit = defineEmits(["onDelete"]);

const onClickDelete = async () => {
  if (!confirm("이 레코드를 삭제하시겠습니까?")) return;

  try {
    const result = await connect({
      method: 'DELETE',
      url: `/record/delete/${props.tapeKey}/${props.recordKey}?userId=${auth.user.id}`
    })
    alert("삭제되었습니다.");
    emit("onDelete", props.recordKey)
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="card reactive record-container">
    <div class="row" style="justify-content: space-between;">
      <p class="caption">#{{ recordKey }}  <span v-if="parentRecordKey">/ <span class="parent-num">#{{ parentRecordKey }}</span>에 대한 답글</span></p>
      <CloseIcon v-if="user.userId==auth.user.id || auth.user.role==1" class="icon" @click="onClickDelete"/>
    </div>
    <p class="content">{{content}}</p>
    <img v-if="img" :src="img.saveFile">
    <div class="card reactive attraction-container" v-if="attraction" @click.stop="$router.push({name: 'attractionDetail', params: {id: attraction.attractionKey}})">
      <h4>{{attraction.name }}</h4>
      <p class="caption">{{ attraction.address }}</p>
    </div>
    <div class="caption-container">
      <p class="caption">@{{ user.userId }} | {{createtime}} </p>
      <div class="row">
        <p class="caption">{{ curLikeNum }}</p>
        <LikeIcon
          class="icon" :class="{'like-btn-unselected': !isLikeCurRecord, 'like-btn-selected': isLikeCurRecord}"
          @click.stop="onClickLike"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
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
  max-height: 300px;
  height: auto;
  width: fit-content;
}
</style>
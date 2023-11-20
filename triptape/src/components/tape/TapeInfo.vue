<script setup>
import { ref, onMounted, computed } from 'vue';
import {connect} from '@/util/access.js';
import EditIcon from "@/assets/icons/EditIcon.vue";
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useAuthStore } from "@/stores/auth.js";
import { useLikeStore } from "@/stores/like";
import { useRoute } from 'vue-router';

const route = useRoute();
const like = useLikeStore();

const auth = useAuthStore();
const isLikeCurTape = ref(false);
const props = defineProps({
  tapeKey: Number,
  createtime: String,
  description: String,
  img: Object,
  joinNum: Number,
  popular: String,
  title: String,
  user: Object,
  joinNum: Number,
  popular: Number,
  viewNum: Number,
})

onMounted(() => {
  isLikeCurTape.value = like.isLikeTape(route.params.id);
})

const userInfo = computed(() => {
  return props.user ? {userId: props.user.userId, userName: props.user.userName} : {userId: "", userName: ""};
})

const onClickLike = async () => {
  if (isLikeCurTape.value) {
    await like.uncheckLikeTape(route.params.id);
  } else {
    await like.checkLikeTape(route.params.id);
  }
  isLikeCurTape.value = like.isLikeTape(route.params.id);
}

</script>

<template>
  <div class="card">
    <img v-if="!img" src="@/assets/img/no_image.png" >
    <img v-else :src="img.saveFile">
    <div>
      <div class="title-container">
        <div style="display: flex; flex-direction: row; align-items: baseline;">
          <h2>{{ props.title }}</h2>
          <div class="caption info">조회수 {{ viewNum }} | 좋아요 {{ popular }}</div>
        </div>
        <div v-if="auth.user.id==userInfo.userId">
          <LikeIcon
            class="icon" :class="{'like-btn-unselected': !isLikeCurTape, 'like-btn-selected': isLikeCurTape}"
            @click="onClickLike"
          />
          <EditIcon class="icon"/>
          <CloseIcon class="icon"/>
        </div>
      </div>
      <p class="description">{{ description }}</p>
      <p class="caption">@{{userInfo.userId}} | {{ createtime }}</p>
    </div>
  </div>
</template>

<style scoped>
.caption.info {
  margin-left: 8px;
}
.title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.description {
  margin-bottom: 8px;
}
img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 8px;
}
.card {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
}

.card > img {
  border-radius: 12px;
}
</style>
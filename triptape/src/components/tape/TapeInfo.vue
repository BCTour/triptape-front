<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import EditIcon from "@/assets/icons/EditIcon.vue";
import LikeIcon from "@/assets/icons/LikeIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { isLikeTape, checkLikeTape, uncheckLikeTape } from '@/util/like';
import { connect } from '@/util/access.js';
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { isLogined } = storeToRefs(auth);


const isLikeCurTape = ref(false);
const tapeKey = ref(null);

const props = defineProps({
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

const curPopular = ref(0);

watch(()=>props.popular, ()=>{
  curPopular.value = props.popular;
})
onMounted(async () => {
  tapeKey.value = route.params.id;
  if (isLogined.value) isLikeCurTape.value = await isLikeTape(tapeKey.value);
})

const userInfo = computed(() => {
  return props.user ? { userId: props.user.userId, userName: props.user.userName } : { userId: "", userName: "" };
})

const onClickLike = async () => {
  if (isLikeCurTape.value) { // 좋아요 -> 안 좋아요
    const result = await uncheckLikeTape(tapeKey.value);
    isLikeCurTape.value = result ? false : true;
    curPopular.value--;
  } else {
    const result = await checkLikeTape(tapeKey.value);
    isLikeCurTape.value = result ? true : false;
    curPopular.value++;
  }
}

const onClickDelete = async () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    let url = `/tape/delete/${tapeKey.value}/${props.user.userId}`;
    try {
      const result = await connect({
        method: "DELETE",
        url: url,
      });
      alert("삭제되었습니다.");
      router.go(-1);
    } catch (error) {
      console.log(error);
    }
  }
}

</script>

<template>
  <div class="card">
    <img v-if="!img" src="@/assets/img/no_image.png">
    <img v-else :src="img.saveFile">
    <div>
      <div class="title-container">
        <div style="display: flex; flex-direction: row; align-items: baseline;">
          <h2>{{ props.title }}</h2>
          <div class="caption info">조회수 {{ viewNum }} | 좋아요 {{ curPopular }}</div>
        </div>
        <div>
          <LikeIcon class="icon" :class="{ 'like-btn-unselected': !isLikeCurTape, 'like-btn-selected': isLikeCurTape }"
            @click="onClickLike" v-if="isLogined" />
          <EditIcon class="icon" v-if="auth.user.id == userInfo.userId"
            @click="$router.push({ name: 'modifyTape', params: { id: $route.params.id } })" />
          <CloseIcon class="icon" v-if="auth.user.id == userInfo.userId" @click="onClickDelete" />
        </div>
      </div>
      <p class="description">{{ description }}</p>
      <p class="caption">@{{ userInfo.userId }} | {{ createtime }}</p>
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

.card>img {
  border-radius: 12px;
}
</style>
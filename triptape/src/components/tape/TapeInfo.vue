<script setup>
import { ref, onMounted, computed } from 'vue';
import {connect} from '@/util/access.js';
import EditIcon from "@/assets/icons/EditIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();

const props = defineProps({
  createtime: String,
  description: String,
  img: Object,
  joinNum: Number,
  popular: String,
  title: String,
  user: Object,
})

const userInfo = computed(()=>{
  return props.user ? {userId: props.user.userId, userName: props.user.userName} : {userId: "", userName: ""};
})

</script>

<template>
  <div class="card">
    <img v-if="!img" src="@/assets/img/no_image.png" >
    <img v-else :src="img.saveFile">
    
    <div>
      <div class="title-container">
        <h2>{{ props.title }}</h2>
        <div v-if="auth.user.id==userInfo.userId">
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
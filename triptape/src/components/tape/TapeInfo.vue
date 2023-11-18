<script setup>
import { ref, onMounted, computed } from 'vue';
import {connect} from '@/util/access.js';

const props = defineProps({
  createtime: String,
  description: String,
  img: String,
  joinNum: Number,
  popular: String,
  title: String,
  user: Object,
})

// const userInfo = ref({
//   userId: "",
//   userName: "",
// })

// onMounted(()=>{
//   userInfo.value.userId = props.user.userId;
//   userInfo.value.userName = props.user.userName;
// })

const userInfo = computed(()=>{
  return props.user ? {userId: props.user.userId, userName: props.user.userName} : {userId: "", userName: ""};
})

</script>

<template>
  <div class="card">
    <img src="https://images.dog.ceo/breeds/terrier-wheaten/n02098105_2456.jpg">
    <div>
      <h2>{{ props.title }}</h2>
      <p>{{ description }}</p>
      <p>@{{userInfo.userName}} | {{ createtime }}</p>
    </div>
  </div>
</template>

<style scoped>
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
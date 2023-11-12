<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const id = ref("");
const pw = ref("");

const onLoginClick = () => {
  console.log(auth)
  if (auth.login(id.value, pw.value)){
    alert("로그인 성공!");
  } else {
    alert("로그인 실패!");
  }
  router.push({name: 'main'});
}

</script>

<template>
  <div>
    <input type="text" name="id" v-model="id">
    <input type="password" name="pw" v-model="pw">
    <button>회원가입</button>
    <button @click="onLoginClick">로그인</button>
    <router-link :to="{name: 'login'}">비밀번호를 잊어버리셨나요?</router-link>
  </div>
</template>

<style scoped>

</style>
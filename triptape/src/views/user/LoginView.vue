<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';


const auth = useAuthStore();
const router = useRouter();


const id = ref("");
const pw = ref("");

const onLoginClick = async () => {
  console.log(auth)
  if (await auth.login(id.value, pw.value)) {
    alert("로그인 성공!");
    router.push({name: 'main'});
  } else {
    alert("로그인 실패!");
  }
}

const onRegistClick = () => {
  router.push({ name: 'registUser' });
}

</script>

<template>
  <div class="card">
    <h1>로그인</h1>
    <div class="input-box">
      <label for="id">아이디</label>
      <input type="text" name="id" placeholder="아이디를 입력해주세요" v-model="id">
    </div>
    <div class="input-box">
      <label for="pw">비밀번호</label>
      <input type="password" name="pw" placeholder="비밀번호를 입력해주세요" v-model="pw">
    </div>
    <div class="btn-box">
      <button @click="onRegistClick" class="primary-outline-btn">회원가입</button>
      <button @click="onLoginClick" class="primary-btn">로그인</button>
    </div>
    <router-link :to="{name: 'findPassword'}">비밀번호를 잊어버리셨나요?</router-link>
  </div>
</template>

<style scoped>

.card {
  width: 500px;
  height: 400px;
  padding: 48px;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 50px;
}

h1 {
  margin-bottom: 32px;
}

div {
  width: 100%;
  margin-bottom: 24px;
}
.input-box {
  display: flex;
  flex-direction: column;
}



.btn-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

button {
  width: 49%;
}

</style>
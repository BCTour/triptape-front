<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const id = ref("");
const name = ref("");
const email=ref("");
const pw = ref("");
const confirmPw = ref("");


const onRegistClick = () => {
  
}

</script>

<template>
  <div class="card">
    <h1>회원가입</h1>
    <div class="input-box">
      <label for="id">아이디</label>
      <input type="text" name="id" placeholder="아이디를 입력해주세요" v-model="id">
    </div>
    <div class="input-box">
      <label for="email">이메일</label>
      <input type="email" name="email" placeholder="이메일 주소를 입력해주세요" v-model="email">
    </div>
    <div class="input-box">
      <label for="name">이름</label>
      <input type="text" name="name" placeholder="이름을 입력해주세요" v-model="name">
    </div>
    <div class="input-box">
      <label for="pw">비밀번호</label>
      <input type="password" name="pw" placeholder="비밀번호를 입력해주세요" v-model="pw">
    </div>
    <div class="input-box">
      <label for="confirmPw">비밀번호 확인</label>
      <input type="password" name="confirmPw" placeholder="비밀번호를 다시 입력해주세요" v-model="confirmPw">
    </div>
    <div class="btn-box">
      <button class="primary-outline-btn" @click="router.go(-1)">취소</button>
      <button class="primary-btn">가입하기</button>
    </div>
  </div>
</template>

<style scoped>

.card {
  width: 500px;
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
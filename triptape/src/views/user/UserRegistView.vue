<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
      <label for="name">이름</label>
      <input type="text" name="name" v-model="name">
    </div>
    <div class="input-box">
      <label for="pw">비밀번호</label>
      <input type="password" name="pw" v-model="pw">
    </div>
    <div class="input-box">
      <label for="confirmPw">비밀번호 확인</label>
      <input type="password" name="confirmPw" v-model="confirmPw">
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
.primary-btn {
  background-color: black;
  color: white;
}
.primary-btn:hover{
  color: #CCCCCC;
}

.primary-outline-btn {
  border: black solid 2px;
  background-color: transparent;
}
.primary-outline-btn:hover {
  background-color: #00000022;
}
</style>
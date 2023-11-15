<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const user = ref({
  userId: "",
  userPw: "",
  userName: "",
  nickname: "",
  gender: 0,
  email: "",
  birthday: "",
  tel: "",
  isAdmin: 0,
})

const confirmPw = ref("");

const onRegistClick = () => {
  // console.log(user.value);
  axios.post("http://localhost:8080/user/regist", { user: user.value })
  .then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  })
}

</script>

<template>
  <div class="card">
    <h1>회원가입</h1>
    <div class="input-box">
      <label for="id">아이디</label>
      <input type="text" name="id" placeholder="아이디를 입력해주세요" v-model="user.userId">
    </div>
    <div class="input-box">
      <label for="pw">비밀번호</label>
      <input type="password" name="pw" placeholder="비밀번호를 입력해주세요" v-model="user.userPw">
    </div>
    <div class="input-box">
      <label for="confirmPw">비밀번호 확인</label>
      <input type="password" name="confirmPw" placeholder="비밀번호를 다시 입력해주세요" v-model="confirmPw">
    </div>
    <div class="input-box">
      <label for="name">이름</label>
      <input type="text" name="name" placeholder="이름을 입력해주세요" v-model="user.userName">
    </div>
    <div class="input-box">
      <label for="nickname">닉네임</label>
      <input type="text" name="nickname" placeholder="닉네임을 입력해주세요" v-model="user.nickname">
    </div>
    <div class="input-box">
      <label for="gender">성별</label>
      <div style="display: flex; flex-direction: row; align-items: center;">
        남성<input type="radio" name="gender" value="0" v-model="user.gender">
        여성<input type="radio" name="gender" value="1" v-model="user.gender">
      </div>
    </div>
    <div class="input-box">
      <label for="email">이메일</label>
      <input type="email" name="email" placeholder="이메일 주소를 입력해주세요" v-model="user.email">
    </div>  
    <div class="input-box">
      <label for="birthday">생일</label>
      <input type="date" name="birthday" v-model="user.birthday">
    </div>
    <div class="input-box">
      <label for="tel">전화번호</label>
      <input type="tel" name="tel" v-model="user.tel">
    </div>
    <div class="btn-box">
      <button class="primary-outline-btn" @click="router.go(-1)">취소</button>
      <button class="primary-btn" @click="onRegistClick">가입하기</button>
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
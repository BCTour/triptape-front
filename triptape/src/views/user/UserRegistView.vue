<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const user = ref({
  userId: "ssafy",
  userPw: "ssafy",
  userName: "ssafy",
  nickname: "ssafy",
  gender: 0,
  email: "ssafy@ssafy",
  birthday: "2022-11-11",
  tel: "010-0000-0000",
  isAdmin: 0,
})

const confirmPw = ref("");

const isSameConfirmPw = computed(()=>{
  return user.value.userPw === confirmPw.value ? true : false;
})

const isValidId = ref(true);
const idMsg = ref("");

const isValidPw = ref(true);
const pwMsg = ref("");

const isValidName = ref(true);
const nameMsg = ref("");

const isValidEmail = ref(true);
const emailMsg = ref("");

const checkValidation = () => {
  let isValid = true;
  if (user.value.userId === "") {
    isValidId.value = false;
    idMsg.value = "아이디는 비어있을 수 없습니다.";
    isValid = false;
  }
  if (user.value.userPw === "") {
    isValidPw.value = false;
    pwMsg.value = "비밀번호는 비어있을 수 없습니다.";
    isValid = false;
  }
  if (user.value.userName === "") {
    isValidName.value = false;
    nameMsg.value = "이름은 비어있을 수 없습니다.";
    isValid = false;
  }
  if (user.value.email === "") {
    isValidEmail.value = false;
    emailMsg.value = "이메일은 비어있을 수 없습니다.";
    isValid = false;
  }

  return isValid ? true : false;
}
const onRegistClick = async () => {
  // 입력 필드 유효성 확인
  
  if (!checkValidation()) return;

  console.log(JSON.stringify(user.value));

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(user.value)], { type: "application/json" });
  formData.append("user", blob); 

  try {
    const result = await axios({
      method: "POST",
      url: "http://localhost:8080/user/regist",
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData
    })
    alert("회원가입에 성공했습니다.");
    router.push({ name: "login" });
  } catch (error) {
    if (error.request.status === 409) {
      isValidId.value = false;
      idMsg.value = "이미 존재하는 아이디입니다.";
    }
  }
}

</script>

<template>
  <div class="card">
    <h1>회원가입</h1>
    <div class="input-box">
      <label for="id">아이디</label>
      <input type="text" :class="{danger: !isValidId}" v-on:click="isValidId=true" name="id" placeholder="아이디를 입력해주세요" v-model="user.userId">
      <label v-show="!isValidId" class="danger">{{idMsg}}</label>
    </div>
    <div class="input-box">
      <label for="pw">비밀번호</label>
      <input type="password" :class="{danger: !isValidPw}" name="pw" placeholder="비밀번호를 입력해주세요" v-model="user.userPw">
      <label v-show="!isValidPw" class="danger">{{pwMsg}}</label>
    </div>
    <div class="input-box">
      <label for="confirmPw">비밀번호 확인</label>
      <input type="password" :class="{danger: !isSameConfirmPw}" name="confirmPw" placeholder="비밀번호를 다시 입력해주세요" v-model="confirmPw">
      <label v-show="!isSameConfirmPw" class="danger">비밀번호가 일치하지 않습니다.</label>
    </div>
    <div class="input-box">
      <label for="name">이름</label>
      <input type="text" :class="{danger: !isValidName}" name="name" placeholder="이름을 입력해주세요" v-model="user.userName">
      <label v-show="!isValidName" class="danger">{{nameMsg}}</label>
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
      <input type="email" :class="{danger: !isValidEmail}" name="email" placeholder="이메일 주소를 입력해주세요" v-model="user.email">
      <label v-show="!isValidEmail" class="danger">{{emailMsg}}</label>
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
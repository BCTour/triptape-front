<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();

const height = ref(500);
const id = ref("");
const email = ref("");
const code = ref("");
const password = ref("");
const codeResult = ref();
const isCode = ref(false);

const findPwEmail = async () => {
  if (id.value === "") {
    // 에러 처리
    alert("아이디를 입력해주세요");
    return;
  }
  
  if (email.value === "") {
    // 에러 처리
    alert("이메일을 입력해주세요");
    return;
  }

  try {
    const result = await axios({
      method: "GET",
      url: `http://localhost:8080/user/findpw?email=${email.value}&userId=${id.value}`,
      header: {
        mode: "cors",
      },
      data: {

      }
    })
    codeResult.value = result.data.code;
    alert("인증번호를 발급하였습니다.");
  } catch (error) {
    if (error.request !== undefined)
      if(error.request.status === 404) {
        alert("아이디가 존재하지 않습니다.");
      }
      if(error.request.status === 401) {
        alert("아이디와 이메일이 일치하지 않습니다.");
      }
    console.log(error);
  }
}

const onClickPassword = () => {
  console.log(code.value + " " + codeResult.value);
  if(code.value == codeResult.value) {
    isCode.value = true;
    height.value = 250;
  } else {
    alert("인증번호가 일치하지 않습니다.");
  }
}

const onClickReset = async () => {
  if (password.value === "") {
    alert("비밀번호를 입력해주세요");
    return;
  }
  try {
    const result = await axios({
      method: "PUT",
      url: `http://localhost:8080/user/regist/pw`,
      header: {
        mode: "cors",
      },
      data: {
        userId: id.value,
        userPw: password.value
      }
    })
    alert("비밀번호 변경을 완료하였습니다.");
    router.go(-1);
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="card" :style="{ height: height + 'px' }">
    <h1>비밀번호 재설정</h1>
    <template v-if="!isCode" >
      <p>비밀번호를 재설정합니다. 가입에 사용한 이메일을 입력해주세요.</p>
      <div class="input-box">
        <label for="id">아이디</label>
        <input type="text" name="id" placeholder="아이디를 입력해주세요" v-model="id">
      </div>
      <div class="input-box">
        <label for="email">이메일</label>
        <input type="email" name="email" placeholder="이메일 주소를 입력해주세요" v-model="email">
        <button class="primary-btn auth" @click="findPwEmail">인증번호 발급</button>
      </div>
      <div class="input-box">
        <label for="code">보안 코드</label>
        <input type="email" name="email" placeholder="이메일로 전송된 코드를 입력해주세요." v-model="code">
      </div>
      <div class="btn-box">
        <button class="primary-outline-btn">돌아가기</button>
        <button class="primary-btn" @click="onClickPassword">확인</button>
      </div>
    </template>
    <template v-if="isCode" >
      <p>변경할 비밀번호를 입력해주세요.</p>
      <div class="input-box">
        <label for="password">비밀번호</label>
        <input type="password" name="email" placeholder="변경할 비밀번호를 입력해주세요" v-model="password">
        <button class="primary-btn auth" @click="onClickReset">비밀번호 변경</button>
      </div>
    </template>
  </div>
</template>

<style scoped>

.card {
  width: 500px;
  height: 450px;
  padding: 48px;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 80px;
}

.card > p {
  margin-bottom: 32px;
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

.auth {
  margin-top: 10px;
  width: 100%;
}

</style>
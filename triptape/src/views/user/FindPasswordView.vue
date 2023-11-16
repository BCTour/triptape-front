<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();

const email = ref("");
const code = ref("");

const onClickReset = async () => {
  if (email.value === "") {
    // 에러 처리
    alert("이메일을 입력해주세요");
    return;
  }

  try {
    const result = await axios({
      method: "GET",
      url: `http://localhost:8080/user/findpw?email=${email.value}`,
      header: {
        mode: "cors",
      },
      data: {

      }
    })

    console.log(result);
  } catch (error) {
    
  }
}

</script>

<template>
  <div class="card">
    <h1>비밀번호 재설정</h1>
    <p>비밀번호를 재설정합니다. 가입에 사용한 이메일을 입력해주세요.</p>
    <div class="input-box">
      <label for="email">이메일</label>
      <input type="email" name="email" placeholder="이메일 주소를 입력해주세요" v-model="email">
    </div>
    <div class="input-box">
      <label for="code">보안 코드</label>
      <input type="email" name="email" placeholder="이메일로 전송된 코드를 입력해주세요." v-model="code">
    </div>
    <div class="btn-box">
      <button class="primary-outline-btn">돌아가기</button>
      <button class="primary-btn" @click="onClickReset">확인</button>
    </div>
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

</style>
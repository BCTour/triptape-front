<script setup>
import { ref } from 'vue';
import { connect } from '@/util/access.js';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const emit = defineEmits(["closeModal"]);


// 사용자 입력 데이터
const password = ref("");
const reason = ref("");

const onClickLeave = async () => {
  if (!confirm("정말 탈퇴하시겠습니까? 회원정보는 복구가 불가합니다.")) {
    return; 
  }

  try {
    const result = await connect({
      method: 'PUT',
      url: `/user/delete`,
      data: {
        userId: auth.user.id,
        userPw: password.value,
        withdrawalReason : reason.value,
      }
    }) 
    // console.log(result);
    alert("탈퇴가 완료되었습니다.");
    auth.logout();
    router.push({ name: 'main' });
  } catch (error) {
    console.log(error);
    alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");
  }
}

</script>

<template>
  <div class="container">
    <h1>회원 탈퇴</h1>
    <div class="input-box">
      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호를 입력해주세요." v-model="password"/>
    </div>
    <div class="input-box">
      <label>사유</label>
      <textarea placeholder="TRIP TAPE를 떠나는 이유를 알려주시겠어요?"></textarea>
    </div>
    <div class="btn-box">
      <button class="primary-outline-btn" @click="$emit('closeModal')">돌아가기</button>
      <button class="primary-btn" @click="onClickLeave">탈퇴하기</button>
    </div>
  </div>
</template>

<style scoped>

textarea {
  height: 100px;
}

h1 {
  margin-bottom: 32px;
}

.container {
  width: 500px;
  margin: 32px auto 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  flex: 1
}
.input-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
}
.btn-box {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
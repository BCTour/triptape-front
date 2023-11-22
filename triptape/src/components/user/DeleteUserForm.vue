<script setup>
import { ref } from 'vue';
import { connect } from '@/util/access.js';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from "vue-router";

const auth = useAuthStore();
const password = ref("");
const router = useRouter();
const emit = defineEmits(["closeModal"]);

const onClickLeave = async () => {
  if (!confirm("정말 탈퇴하시겠습니까? 회원정보는 복구가 불가합니다.")) {
    return; 
  }

  try {
    const result = await connect({
      method: 'DELETE',
      url: `/user/delete`,
      data: {
        userId: auth.user.id,
        userPw: password.value,
      }
    }) 
    console.log(result);
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
  <div>
    <h2>회원 탈퇴</h2>
    <div class="input-box">
      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호를 입력해주세요." v-model="password"/>
      <button class="primary-btn" @click="onClickLeave">탈퇴하기</button>
      <button class="primary-outline-btn" @click="$emit('closeModal')">돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  flex-direction: row;
}
</style>
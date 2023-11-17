<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";

const tape = ref({
  title: "",
  description: "",
  user: {
    userId: "",
  }
});

onMounted(() => {
  tape.value.user.userId = localStorage.getItem("userId");
})

const title = ref("");
const description = ref("");

const onClickRegist = async () => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(tape.value)], { type: "application/json" });
  formData.append("tape", blob);

  try {
    const result = connect({
      method: "POST",
      url: `/tape/regist`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '새로운 테이프 만들기', description: '나만의 테이프를 만듭니다.', isEnableBack: true}"/>
  </div>
  <div class="card">
    <div class="input-box">
      <label>테이프 이름</label>
      <input v-model="tape.title" type="text" placeholder="테이프 이름을 입력해주세요."/>
    </div>
    <div class="input-box">
      <label>테이프 소개</label>
      <textarea v-model="tape.description" placeholder="테이프 소개를 입력해주세요."></textarea>
    </div>
    <div class="input-box">
      <button class="primary-btn" @click="onClickRegist">등록하기</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 500px;
  padding: 48px;
  margin: auto;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

textarea {
  height: 200px;
}
.input-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
}
</style>
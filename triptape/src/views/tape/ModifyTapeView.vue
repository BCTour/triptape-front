<script setup>
import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";
import { useRouter, useRoute} from 'vue-router';

const router = useRouter();
const route = useRoute();
const tape = ref({
  title: "",
  description: "",
  user: {
    userId: "",
  }
});

let imgFile = null;
 
onMounted(async () => {
  tape.value.user.userId = localStorage.getItem("userId");
  tape.value.tapeKey = route.params.id;
  try {
    const result = await connect({
      method: "GET",
      url: `/tape/search/info/${route.params.id}`,
    })
    console.log(result);
    tape.value.title = result.data.tape.title;
    tape.value.description = result.data.tape.description;
  } catch (error){
    console.log(error);
  }
})

const onFileChange = (event) => {
  imgFile = event.target.files[0];
}

const onClickModify = async () => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(tape.value)], { type: "application/json" });
  formData.append("tape", blob);

  if (imgFile) formData.append("file", imgFile);
  try {
    const result = await connect({
      method: "PUT",
      url: `/tape/modify`,
      data: formData,
      headers: {
        'Content-Type': "multipart/form-data",
      },
    })
    console.log(result);
    router.go(-1);
  } catch (error) {
    console.log(error);
    alert("테이프 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '테이프 수정', description: '테이프 내용을 수정합니다.', isEnableBack: true}"/>
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
      <label>대표 이미지</label>
      <input type="file" @change="onFileChange"/>
    </div>
    <div class="input-box">
      <button class="primary-btn" @click="onClickModify">수정하기</button>
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
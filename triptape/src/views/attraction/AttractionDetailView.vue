<script setup>
import { onMounted } from 'vue';
import CommentList from '@/components/common/CommentList.vue';
import CreateComment from '@/components/common/CreateComment.vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeList from "@/components/tape/TapeList.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import axios from "axios";

onMounted(async () => {
  try {
    const result = await axios({
      url: "http://localhost:8080/attraction/info/{key}"
    });
  } catch (error) {

  }
});
</script>


<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '장소 상세', description: '장소 이름', isEnableBack: true}"/>
  </div>
  <div class="detail-container">
    <div class="card info-container">
      <img src="../../assets/img/logo.png">
      <p class="caption">카테고리</p>
      <h2>장소 이름</h2>
      <p>주소</p>
      <p>설명</p>
      <KakaoMap/>
    </div>
    <div class="card tape-container">
      <TapeList/>
    </div>
    <div class="card comment-container">
      <CommentList/>
      <CreateComment/>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: row;
  height: 700px;
}
.info-container {
  padding: 16px;
}
.comment-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card {
  flex: 1;
  margin-right: 8px;
}

p {
  margin-bottom: 8px;
}
</style>
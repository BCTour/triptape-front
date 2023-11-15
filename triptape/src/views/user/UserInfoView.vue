<script setup>
import { ref } from 'vue';
import CommentList from '@/components/common/CommentList.vue';
import CreateComment from '@/components/common/CreateComment.vue';
import SubHeading from "@/components/common/SubHeading.vue";
import TapeList from "@/components/tape/TapeList.vue";

const user = ref({
  id: "ssafy",
  name: "김싸피",
  nickname: "빠삐빠삐",
  email: "ssafy@ssafy.com",
  tel: "010-1111-1111",
  birthday: "2023-04-26",
})
</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '사용자 정보', description: '사용자 이름'}"/>
  </div>
  <div class="detail-container">
    <div class="card info-container">
      <img class="profile-img" src="../../assets/img/profile.jpg">
      <p class="caption">@{{user.id}}</p>
      <h2>{{user.name}}</h2>
      <div class="input-box">
        <label>별명</label>
        <input type="text" v-model="user.nickname" disabled/>
      </div>
      <div class="input-box">
        <label>이메일</label>
        <input type="email" v-model="user.email" disabled/>
      </div>
      <div class="input-box">
        <label>전화번호</label>
        <input type="tel" v-model="user.tel" disabled/>
      </div>
      <div class="input-box">
        <label>생일</label>
        <input type="date" v-model="user.birthday" disabled/>
      </div>
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
.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.detail-container {
  display: flex;
  flex-direction: row;
  height: 700px;
}

.profile-img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
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
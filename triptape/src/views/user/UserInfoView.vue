<script setup>

import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();

const userInfo = ref({
  userId: "ssafy",
  name: "김싸피",
  email: "ssafy@ssafy.com",
  tel: "010-1234-1234",
  birthday: "2023-04-26",
  profileImg: {
    saveFile: "",
  },
})

onMounted(async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/info/${auth.user.id}`
    });
    console.log(result);
    userInfo.value = result.data.userInfo;
    userInfo.value.birthday = userInfo.value.birthday.split(' ')[0];
  } catch (error) {
    console.log(error);
  }
})

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '사용자 정보', description: '사용자 이름'}"/>
  </div>
  <div class="detail-container">
    <div class="card info-container">
      <img v-if="!userInfo.profileImg" class="profile-img" src="@/assets/img/profile.jpg">
      <img v-else class="profile-img" :src="userInfo.profileImg.saveFile">
      <p class="caption">@{{userInfo.userId}}</p>
      <h2>{{userInfo.userName}}</h2>

      <div class="input-box">
        <label>이메일</label>
        <input type="email" v-model="userInfo.email" disabled/>
      </div>
      <div class="input-box">
        <label>전화번호</label>
        <input type="tel" v-model="userInfo.tel" disabled/>
      </div>
      <div class="input-box">
        <label>생일</label>
        <input type="date" v-model="userInfo.birthday" disabled/>
      </div>
    </div>
    <div class="card tape-container">
      
    </div>
    <div class="card comment-container">
      
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
<script setup>

import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";
import { useAuthStore } from "@/stores/auth.js";
import TapeList from '@/components/tape/TapeList.vue';

const auth = useAuthStore();
const userJoinedTapes = ref([]);
const userLikedTapes = ref([]);
const userLikedAttraction = ref([]);
const userlikedRecord = ref([]);


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

  loadJoinedTape();
  loadLikedTape();
  loadLikedAttraction();
  loadLikedRecord();
})

const loadJoinedTape = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/join/tape?userId=${auth.user.id}`,
    })
    userJoinedTapes.value = result.data.tape;
  } catch (error) {
    console.log(error);
  }
}

const loadLikedTape = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/like/tape?userId=${auth.user.id}`,
    })
    userLikedTapes.value = result.data.tape;
  } catch (error) {
    console.log(error);
  }
}

const loadLikedAttraction = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/like/attraction?userId=${auth.user.id}`,
    })
    userLikedAttraction.value = result.data.attraction;
  } catch (error) {
    console.log(error);
  }
}

const loadLikedRecord = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/like/record?userId=${auth.user.id}`,
    })
    userlikedRecord.value = result.data;
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '사용자 정보', description: '사용자 이름'}"/>
  </div>
  <div class="detail-container">
    <div class="col card info-container">
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
    <div class="card">
      <h3>참여한 테이프</h3>
      <TapeList :tapes="userJoinedTapes"/>
    </div>
    <div class="card">
      <h3>좋아요를 누른 테이프</h3>
      <TapeList :tapes="userLikedTapes"/>
    </div>
    <div class="card">
      <h3>좋아요를 누른 장소</h3>
      <TapeList :tapes="userLikedTapes"/>
    </div>
    <div class="card">
      <h3>좋아요를 누른 레코드</h3>
      <TapeList :tapes="userLikedTapes"/>
    </div>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.col {
  flex: 1;
}
.detail-container {
  display: flex;
  flex-direction: row;
  height: 700px;
  overflow-x: auto;
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
  min-width: 350px;
}

p {
  margin-bottom: 8px;
}

h3 {
  padding: 16px;
}
</style>
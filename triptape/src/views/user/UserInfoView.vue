<script setup>

import { ref, onMounted } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";
import { useAuthStore } from "@/stores/auth.js";
import TapeTable from '@/components/tape/TapeTable.vue';
import AttractionTable from '@/components/attraction/AttractionTable.vue';
import RecordTable from '@/components/tape/RecordTable.vue';
import { useRouter } from "vue-router";
const auth = useAuthStore();
const userJoinedTapes = ref([]);
const userLikedTapes = ref([]);
const userLikedAttraction = ref([]);
const userLikedRecord = ref([]);
const isDisabled = ref(true);
let imgFile = null;
const isValidName = ref(true);
const isValidEmail = ref(true);
const router = useRouter();

const userInfo = ref({
  userId: String,
  userName: String,
  email: String,
  tel: String,
  birthday: Date,
  gender: Number,
  profileImg: {
    saveFile: String,
  },
})

onMounted(async () => {
  await loadUserInfo();
  loadJoinedTape();
  loadLikedTape();
  loadLikedAttraction();
  loadLikedRecord();
})

const loadUserInfo = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/info/${auth.user.id}`
    });
    userInfo.value = result.data.userInfo;
    userInfo.value.birthday = userInfo.value.birthday.split(' ')[0];
  } catch (error) {
    console.log(error);
  }
}

const loadJoinedTape = async () => {
  try {
    const result = await connect({
      method: 'GET',
      url: `/user/join/tape?userId=${auth.user.id}`,
    })
    if (result.data.tape) userJoinedTapes.value = result.data.tape;
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
    if (result.data.tape) userLikedTapes.value = result.data.tape;
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
    if (result.data.attraction) userLikedAttraction.value = result.data.attraction;
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
    if (result.data.record) userLikedRecord.value = result.data.record;
  } catch (error) {
    console.log(error);
  }
}

const clickModify = () => {
  isDisabled.value = false;
}

const clickBack = async () => {
  await loadUserInfo();
  isDisabled.value = true;
  isValidName.value = true;
  isValidEmail.value = true;
}

const onFileChange = (event) => {
  imgFile = event.target.files[0];
}

const checkValidation = () => {
  let isValid = true;

  if (userInfo.value.userName === "") {
    isValidName.value = false;
    isValid = false;
  }
  if (userInfo.value.email === "") {
    isValidEmail.value = false;
    isValid = false;
  }

  return isValid ? true : false;
}


const clickModifyInfo = async () => {
  // 입력 필드 유효성 확인
  if (!checkValidation()) return;

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(userInfo.value)], { type: "application/json" });
  formData.append("user", blob);
  if (imgFile) formData.append("file", imgFile);
  try {
    const result = await connect({
      method: "PUT",
      url: "/user/modify",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData
    })
    loadUserInfo();
    isDisabled.value = true;
  } catch (error) {
    console.log(error);
  }
}

const onClickTape = (key) => {
  router.push(`/tape/detail/${key}`)
}

const onClickAttraction = (key) => {
  router.push(`/attraction/detail/${key}`)
}

const onClickRecord = (tapeKey, recordKey) => {
  router.push(`/tape/detail/${tapeKey}`)
}


</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{ title: '사용자 정보', description: userInfo.userName + ' 님의 마이페이지입니다.' }" />
  </div>
  <div class="detail-container">
    <div class="col card info-container">
      <img v-if="!userInfo.profileImg" class="profile-img" src="@/assets/img/profile.jpg">
      <img v-else class="profile-img" :src="userInfo.profileImg.saveFile">

      <p class="caption">@{{ userInfo.userId }}</p>
      <h2 v-if="isDisabled">{{ userInfo.userName }}</h2>

      <div class="input-box" style="margin-top:10px" v-if="!isDisabled">
        <label>이름</label>
        <input type="email" v-model="userInfo.userName" :disabled="isDisabled" />
        <label v-show="!isValidName" class="danger">이름은 비어있을 수 없습니다.</label>
      </div>
      <div class="input-box">
        <label>이메일</label>
        <input type="email" v-model="userInfo.email" :disabled="isDisabled" />
        <label v-show="!isValidEmail" class="danger">이메일은 비어있을 수 없습니다.</label>
      </div>
      <div class="input-box">
        <label>전화번호</label>
        <input type="tel" v-model="userInfo.tel" :disabled="isDisabled" />
      </div>
      <div class="input-box">
        <label>생일</label>
        <input type="date" v-model="userInfo.birthday" :disabled="isDisabled" />
      </div>
      <div class="input-box">
        <label for="gender">성별</label>
        <div style="display: flex; flex-direction: row; align-items: center;">
          남성<input type="radio" name="gender" value="0" v-model="userInfo.gender" :disabled="isDisabled">
          여성<input type="radio" name="gender" value="1" v-model="userInfo.gender" :disabled="isDisabled">
        </div>
      </div>
      <div v-if="!isDisabled" class="input-box">
        <label for="img">프로필 이미지</label>
        <input type="file" name="img" @change="onFileChange">
      </div>
      <button class="primary-btn" v-if="isDisabled" @click="clickModify">정보 수정</button>
      <div class="btn-box" v-if="!isDisabled">
        <button class="primary-outline-btn modify-btn" @click="clickBack">돌아가기</button>
        <button class="primary-btn modify-btn" @click="clickModifyInfo">저장</button>
      </div>
    </div>
    <div class="card">
      <h3>참여한 테이프</h3>
      <TapeTable :tapes="userJoinedTapes" @on-click-item="onClickTape" />
    </div>
    <div class="card">
      <h3>좋아요를 누른 테이프</h3>
      <TapeTable :tapes="userLikedTapes" @on-click-item="onClickTape" />
    </div>
    <div class="card">
      <h3>좋아요를 누른 장소</h3>
      <AttractionTable :attractions="userLikedAttraction" @on-click-item="onClickAttraction" />
    </div>
    <div class="card">
      <h3>좋아요를 누른 레코드</h3>
      <RecordTable :records="userLikedRecord" @on-click-item="onClickRecord" />
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
  height: 780px;
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

.btn-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.modify-btn {
  width: 49%;
}
</style>
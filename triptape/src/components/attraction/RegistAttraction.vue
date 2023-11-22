<script setup>

import { ref, onMounted } from 'vue';

import KakaoMapGeocoder from "@/components/map/KakaoMapGeocoder.vue";
import SubHeading from "@/components/common/SubHeading.vue";

import { connect } from "@/util/access.js";

const emit = defineEmits("closeModal");

const attractionInfo = ref({
  attractionType: {
    typeCode: null
  },
  name: "",
  address: "",
  latitude: 0,
  longitude: 0,
  description: "",
  userId: "",
})

let imgFile = null;
const onFileChange = (event) => {
  imgFile = event.target.files[0];
}
const fileInput = ref(null);
const onClickCancelFile = () => {
	imgFile = null;
	fileInput.value.value = null;
}

const options = ref([
  { name: "관광지", value: 1 },
  { name: "문화시설", value: 2 },
  { name: "여행코스", value: 3 },
  { name: "레포츠", value: 4 },
  { name: "숙박", value: 5 },
  { name: "쇼핑", value: 6 },
  { name: "음식점", value: 7 },
])

onMounted(() => {
  attractionInfo.value.userId = localStorage.getItem("userId");
})

const onClickPoint = ({ latitude, longitude, address }) => {
  attractionInfo.value.address = address;
  attractionInfo.value.latitude = latitude;
  attractionInfo.value.longitude = longitude;
}

const isValidName = ref(true);
const isValidType = ref(true);
const isValidAddress = ref(true);
const isValidDescription = ref(true);

const checkValidation = () => {
  let isValid = true;

  if (!attractionInfo.value.name) {
    isValid = false;
    isValidName.value = false;
  } else {
    isValidName.value = true;
  }

  if (!attractionInfo.value.attractionType.typeCode) {
    isValid = false;
    isValidType.value = false;
  } else {
    isValidType.value = true;
  }

  if (!attractionInfo.value.address) {
    isValid = false;
    isValidAddress.value = false;
  } else {
    isValidAddress.value = true;
  }

  if (!attractionInfo.value.description) {
    isValid = false;
    isValidDescription.value = false;
  } else {
    isValidDescription.value = true;
  }

  return isValid;
}


const onClickRegist = async () => {
  if (!checkValidation()) return;

  // console.log(attractionInfo.value);
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(attractionInfo.value)], { type: "application/json" });
  formData.append("attraction", blob);
  if (imgFile) formData.append("file", imgFile);
  try {
    const result = await connect({
      method: 'POST',
      url: `/attraction/regist`,
      data: formData,
    });
    alert("장소 등록이 완료되었습니다.");
    emit("closeModal");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="">
    <div class="sub-heading-container">
      <SubHeading v-bind="{ title: '새로운 장소 등록', description: '소개하고 싶은 장소를 등록해주세요', isEnableBack: false }" />
    </div>
    <div class="row">
      <div class="col">
        <KakaoMapGeocoder @on-click-point="onClickPoint" />
      </div>
      <div class="col card">
        <div class="input-box">
          <label>장소 이름</label>
          <input type="text" v-model="attractionInfo.name" />
          <label v-show="!isValidName" class="danger">장소 이름을 등록해주세요.</label>
        </div>
        <div class="input-box">
          <label>장소 종류</label>
          <select v-model="attractionInfo.attractionType.typeCode">
            <option v-for="option in options" :value="option.value">{{ option.name }}</option>
          </select>
          <label v-show="!isValidType" class="danger">장소 종류를 등록해주세요.</label>
        </div>
        <div class="input-box">
          <label>주소</label>
          <div class="row">
            <input type="text" style="flex: 1" disabled v-model="attractionInfo.address" />
          </div>
          <label v-show="!isValidAddress" class="danger">주소를 등록해주세요.</label>
        </div>
        <div class="input-box">
          <label>세부설명</label>
          <textarea v-model="attractionInfo.description"> </textarea>
          <label v-show="!isValidDescription" class="danger">세부 설명을 작성해주세요.</label>
        </div>
        <div class="input-box">
          <label>이미지</label>
          <div class="row">
            <input type="file" accept=".jpg, .png" name="img" ref="fileInput" @change="onFileChange">
            <button class="primary-outline-btn" @click="onClickCancelFile">취소</button>
          </div>
        </div>
        <button class="primary-btn" @click="onClickRegist">등록</button>
        <button class="primary-outline-btn" @click="$emit('closeModal')">돌아가기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  height: 150px;
}

.card {
  padding: 16px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.row > input {
  flex: 1;
}
.col {
  box-sizing: border-box;
  width: calc(50% - 8px);
  height: 80vh;
}

.test {
  width: 100px;
  height: 200px;
  background-color: aqua;
}

.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
</style>
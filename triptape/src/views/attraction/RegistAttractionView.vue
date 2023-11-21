<script setup>

import { ref, onMounted } from 'vue';

import KakaoMapGeocoder from "@/components/map/KakaoMapGeocoder.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import { connect } from "@/util/access.js";

const onClickPoint = ({ latitude, longitude, address }) => {
  console.log(`위도 : ${latitude}, 경도: ${longitude}, 주소: ${address}`);
  attractionInfo.value.address = address;
  attractionInfo.value.latitude = latitude;
  attractionInfo.value.longitude = longitude;
}

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

const options = ref([
  {name: "관광지",    value: 1 },
  {name: "문화시설",  value: 2 },
  {name: "여행코스",  value: 3 },
  {name: "레포츠",    value: 4 },
  {name: "숙박",      value: 5 },
  {name: "쇼핑",      value: 6 },
  {name: "음식점",    value: 7 },
])

onMounted(() => {
  attractionInfo.value.userId = localStorage.getItem("userId");
})

const onClickRegist = async () => {
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
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="">
    <div class="sub-heading-container">
      <SubHeading v-bind="{title: '새로운 장소 등록', description: 'asdf', isEnableBack: true}"/>
    </div>
    <div class="row">
      <div class="col card">
        <div class="input-box">
          <label>장소 이름</label>
          <input type="text" v-model="attractionInfo.name"/>
        </div>
        <div class="input-box">
          <label>장소 종류</label>
          <select v-model="attractionInfo.attractionType.typeCode">
            <option v-for="option in options" :value="option.value">{{ option.name }}</option>
          </select>
        </div>
        <div class="input-box">
          <label>주소</label>
          <input type="text" v-model="attractionInfo.address" disabled/>
        </div>
        <div class="input-box">
          <label>세부설명</label>
          <textarea v-model="attractionInfo.description"> </textarea>
        </div>
        <div class="input-box">
          <label>이미지</label>
          <input type="file" @change="(event)=>{imgFile = event.target.files[0]}"  />
        </div>
        <button class="primary-btn" @click="onClickRegist">등록</button>
      </div>
      <div class="col">
        <KakaoMapGeocoder @on-click-point="onClickPoint"/>
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

.col{
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
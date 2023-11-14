<script setup>
import { ref } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '새로운 장소 추가', description: '물의를 일으킬 수 있는 장소의 경우 삭제될 수 있습니다.'}"/>
    <CloseIcon class="icon" @click="$emit('closeModal')"/>
  </div>
  <KakaoMap />
  <div class="contents">
    <div>
    </div>
    <div class="map-container">
      <div class="btn-box">
        <button class="primary-outline-btn" @click="$emit('closeModal')">취소</button>
        <button class="primary-btn">등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 8px;
}
.contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.contents > div {
  width: calc(50% - 16px);
}

.btn-box {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.btn-box > button {
  width: calc(50% - 4px);
}

</style>
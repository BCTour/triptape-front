<script setup>
import { ref } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";
import Modal from "@/components/common/Modal.vue";
import CreateAttraction from "@/components/attraction/CreateAttraction.vue";
import SearchBar from "@/components/common/SearchBar.vue";

/* 모달 관련 */
const isModalOpen = ref(false);

const toggleModal = () => {
  isModalOpen.value = isModalOpen.value ? false : true;
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '장소 선택', description: '레코드에 추가할 장소를 선택해주세요.'}"/>
    <CloseIcon class="icon" @click="$emit('closeModal')"/>
  </div>
  <div class="contents">
    <div>
      <SearchBar/>  
      <AttractionItemList />
    </div>
    <div class="map-container">
      <div class="card">
        <h4>선택된 장소</h4>
        <p>장소 이름</p>
      </div>
      <KakaoMap v-if="!isModalOpen"/>
      <div class="btn-box">
        <button class="primary-outline-btn" @click="toggleModal"> + 새로운 장소 등록</button>
        <button class="primary-btn">레코드에 추가하기</button>
      </div>
    </div>
  </div>
  <Modal v-if="isModalOpen" @close-modal="toggleModal">
    <CreateAttraction @close-modal="toggleModal"/>
  </Modal>
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
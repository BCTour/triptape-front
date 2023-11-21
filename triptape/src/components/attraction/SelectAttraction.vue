<script setup>
import { ref, computed } from 'vue';
import SubHeading from "@/components/common/SubHeading.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";
import Modal from "@/components/common/Modal.vue";
import RegistAttraction from '@/components/attraction/RegistAttraction.vue';

import SearchBar from "@/components/common/SearchBar.vue";
import { connect } from '@/util/access.js';
import { useRouter } from 'vue-router';
/* 모달 관련 */
const router = useRouter();

const isModalOpen = ref(false);
const toggleModal = () => {
  isModalOpen.value = isModalOpen.value ? false : true;
}

const selectedAttraction = ref(null);
const mapAttractions = computed(()=>{
  return [selectedAttraction]
})
const attractions = ref([]);

const typeOptions = ref([
  {name: "모두", value: null},
  {name: "관광지", value: 1},
  {name: "문화시설", value: 2},
  {name: "여행코스", value: 3},
  {name: "레포츠", value: 4},
  {name: "숙박", value: 5},
  {name: "쇼핑", value: 6},
  {name: "음식점", value: 7},

]);

const options = ref([
  {name: "이름", value: "name"},
  {name: "주소", value: "address"},
  // {name: "설명", value: "description"},
]);

const page = ref(1);
const searchCondition = ref({
  category: "",
  word: "",
})

const onClickSearch = async (category, word) => {
  searchCondition.value.category = category;
  searchCondition.value.word = word;
  attractions.value = [];
  page.value = 1;
  await onLoadMore();
}

const onLoadMore = async () => {
  const category = searchCondition.value.category;
  const word = searchCondition.value.word;
  try {
    const url = `/attraction/search?currentPage=${page.value++}&${category}=${word}`;
    const result = await connect({
      method: "GET",
      url: url,
    })
    console.log(result);
    attractions.value.push(...result.data.attraction);
  } catch (error) {
    console.log(error);
  }
}

const onClickItem = async (attraction) => {
  // console.log(attractionId);
  selectedAttraction.value = attraction;
  // console.log(selectedAttraction.value);
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '장소 선택', description: '레코드에 추가할 장소를 선택해주세요.'}"/>
    <CloseIcon class="icon" @click="$emit('closeModal')"/>
  </div>
  <div class="contents">
    <div>
      <SearchBar :options="options" @on-click-search="onClickSearch"/>  
      <AttractionItemList :attractions="attractions" @on-load-more="onLoadMore" @on-click-item="onClickItem"/>
    </div>
    <div class="map-container">
      <div class="card">
        <h4>선택된 장소</h4>
        <p v-if="!selectedAttraction">선택된 장소가 없습니다.</p>
        <p v-else>{{selectedAttraction.name}}</p>
      </div>
      <KakaoMap v-if="!isModalOpen" />
      <div class="btn-box">
        <button class="primary-outline-btn" @click="toggleModal"> + 새로운 장소 등록</button>
        <button class="primary-btn" @click="$emit('onAddAttraction', selectedAttraction), $emit('closeModal')">레코드에 추가하기</button>
      </div>
    </div>
  </div>
  <Modal v-if="isModalOpen" @close-modal="toggleModal">
    <RegistAttraction @close-modal="toggleModal"/>
  </Modal>
</template>

<style scoped>
.card {
  padding: 16px;
  margin-bottom: 8px;
}
.contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.contents > div {
  width: calc(50% - 16px);
}
.map-container {
  display: flex;
  flex-direction: column;
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
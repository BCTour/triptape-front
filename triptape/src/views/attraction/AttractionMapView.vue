<script setup>
import AttractionMapList from "@/components/attraction/AttractionMapList.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import Modal from "@/components/common/Modal.vue";
import RegistAttraction from '@/components/attraction/RegistAttraction.vue';
import { ref, onMounted } from 'vue';
import { connect } from '@/util/access.js';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth.js'


const router = useRouter();
const store = useAuthStore();

const isModalOpen = ref(false);
const toggleModal = () => {
  isModalOpen.value = isModalOpen.value ? false : true;
}

const typeOptions = ref([
  { name: "모두", value: null },
  { name: "관광지", value: 1 },
  { name: "문화시설", value: 2 },
  { name: "여행코스", value: 3 },
  { name: "레포츠", value: 4 },
  { name: "숙박", value: 5 },
  { name: "쇼핑", value: 6 },
  { name: "음식점", value: 7 },

]);

onMounted(() => {
  getCurCoordinate();
})

const getCurCoordinate = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    coord.value.latitude = position.coords.latitude;
    coord.value.longitude = position.coords.longitude;
    console.log("coord : ");
    console.log(coord.value);
  })
}

const options = ref([
  { name: "이름", value: "name" },
  { name: "주소", value: "address" },
  // {name: "설명", value: "description"},
]);

const page = ref(1);
const attractions = ref([]);

const coord = ref({
  latitude: 37.501328668708,
  longitude: 127.03953821497
})

const curCoord = ref({
  latitude: 37.501328668708,
  longitude: 127.03953821497
})

const onLoadMore = async () => {
  const category = searchCondition.value.category;
  const word = searchCondition.value.word;
  const type = searchCondition.value.type;
  console.log(coord.value);
  try {
    let url = `/attraction/search?currentPage=${page.value++}&latitude=${coord.value.latitude}&longitude=${coord.value.longitude}`;
    if (category) url += `&${category}=${word}`;
    if (type) url += `&typeCode=${type}`;
    console.log("검색 url :" + url);

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

const searchCondition = ref({
  category: "",
  word: "",
  type: "",
})

const onClickSearch = async (category, word, typeCode) => {
  searchCondition.value.category = category;
  searchCondition.value.word = word;
  searchCondition.value.type = typeCode;

  attractions.value = [];
  page.value = 1;
  await onLoadMore();
}

const onClickItem = async (attraction) => {
  router.push({ name: 'attractionDetail', params: { id: attraction.attractionKey } })
}

const onChangeCenter = (center) => {
  console.log(center);
  curCoord.value.latitude = center.Ma;
  curCoord.value.longitude = center.La;
}

const onClickSearchAgain = async () => {
  console.log("============================================")
  coord.value.latitude = curCoord.value.latitude;
  coord.value.longitude = curCoord.value.longitude;
  await onClickSearch();
}

</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{ title: '관광지 목록 조회', description: '등록된 관광지 목록을 지도에 표시합니다.' }" />
    <SearchBar :options="options" :isEnableType="true" @on-click-search="onClickSearch" />
  </div>
  <button v-if="store.isLogined" class="primary-btn" @click="toggleModal">+ 새로운 관광지 추가</button>
  <button v-if="store.isLogined" class="primary-btn" @click="onClickSearchAgain">지도 위치 기준 재검색</button>
  
  <AttractionMapList v-if="!isModalOpen" :attractions="attractions" @on-load-more="onLoadMore"
    @on-click-item="onClickItem" @on-change-center="onChangeCenter"/>
  <Modal v-if="isModalOpen" @close-modal="toggleModal">
    <RegistAttraction @close-modal="toggleModal" />
  </Modal>
</template>

<style scoped>
.attraction-map-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.col {
  box-sizing: border-box;
  width: calc(50% - 8px);
}
.primary-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
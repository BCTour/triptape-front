<script setup>
import AttractionMapList from "@/components/attraction/AttractionMapList.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import SearchBar from "@/components/common/SearchBar.vue";
</script>

<template>
  <div class="sub-heading-container">
    <SubHeading v-bind="{title: '관광지 목록 조회', description: '등록된 관광지 목록을 지도에 표시합니다.'}"/>
    <SearchBar />
  </div>
  <AttractionMapList />
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
  /* display: flex; */
  /* flex-direction: column; */
  
}
</style>
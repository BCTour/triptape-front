<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import SearchBar from "@/components/common/SearchBar.vue";
</script>

<template>
  <div class="attraction-map-view">
    <div class="col card">
      <KakaoMap/>
    </div>
    <div class="col">
      <AttractionItemList />
    </div>
  </div>
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
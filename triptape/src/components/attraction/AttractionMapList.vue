<script setup>
import { ref, onMounted } from 'vue';
import KakaoMap from "@/components/map/KakaoMap.vue";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";
import SubHeading from "@/components/common/SubHeading.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import axios from "axios";

const attractions = ref([]);
const page = ref(1);

const loadAttractions = async () => {
  try {
    const result = await axios({
      url: "http://localhost:8080/attraction/search?" + "currentPage="+page.value++,
      method: "GET",
      header: {

      }
    })
    // console.log(result.data.attraction)
    attractions.value.push(...result.data.attraction);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  // loadAttractions();
});

</script>



<template>
  <div class="attraction-map-view">
    <div class="col card">
      <KakaoMap :attractions="attractions"/>
    </div>
    <div class="col">
      <AttractionItemList :attractions="attractions" @on-load-more="loadAttractions"/>
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
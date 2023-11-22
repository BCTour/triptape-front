<script setup>
import { ref, onMounted} from 'vue';
import KakaoMap from "@/components/map/KakaoMap.vue";
import AttractionItemList from "@/components/attraction/AttractionItemList.vue";


const props = defineProps({
  attractions: Array,
})

const emit = defineEmits(["onLoadMore", "onClickItem", "onChangeCenter"])

onMounted(() => {

});

const onClickItem = async (attractionInfo) => {
  emit("onClickItem", attractionInfo);
}

const onChangeCenter = (center) => {
  emit("onChangeCenter", center);
}
</script>

<template>
  <div class="attraction-map-view">
    <div class="col card">
      <KakaoMap :attractions="attractions" :coord="coord" @on-change-center="onChangeCenter"/>
    </div>
    <div class="col">
      <AttractionItemList
        :attractions="attractions"
        @on-load-more="$emit('onLoadMore')"
        @on-click-item="onClickItem"
      />
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